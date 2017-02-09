var express = require('express');
var router = express.Router();

var School = require('../models/schools');
var Task = require('../models/tasks');
var User = require('../models/users');

var TaskCtrl = require('../middlewares/task_reset')
var NoteCtrl = require('../middlewares/note_reset')
var task_find = require('../middlewares/find_task')

/* GET app page. */
router.get('/', function(req, res, next) {
    if(res.locals.user.typeuser == null){
       return res.redirect('/');
    }else{
        if(res.locals.user.typeuser == 'Estudiante' || res.locals.user.typeuser == 'Acudiente'){
            Task.find({grade: res.locals.user.grade},function(err,notas){
                if(err){
                    return res.redirect('/app')
                }
                res.render(res.locals.user.typeuser+'/home',{title: 'Proschool - Home', notas: notas})
            })
        }else{
            Task.find({})
                .populate('profesor')
                .exec(function(err,tasks){
                    if(err) console.log(err)
                    res.render('Profesor/home', {title: 'Home - Proschool', tasks: tasks})
                })
        }
    }
});

/* REST */
router.all(['/task'], TaskCtrl.taskPermission)

router.all(['/task/new', '/task/:id/edit', "/note/:id" , "/note/new/:id"], TaskCtrl.taskPermission)

router.get('/task/new', TaskCtrl.renderNewTask)

router.get('/note/new/:id',task_find ,NoteCtrl.renderNewNote)

router.route('/note')
    .get(TaskCtrl.findAll)

router.all('/note/:id*', task_find)
router.route('/note/:id')
    .put(NoteCtrl.updateNote)
    .post(NoteCtrl.addNote)
    .delete(NoteCtrl.deleteNote)

router.get('/task/note/:id/edit',task_find, NoteCtrl.renderEditNote)

router.route('/task/note/:username')
    .get(NoteCtrl.findAll)

router.all('/task/:id*', task_find)

router.get('/task/:id/edit', TaskCtrl.renderEditTask)

router.route('/task/:id')
    .get(TaskCtrl.renderShowTask)
    .put(TaskCtrl.updateTask)
    .delete(TaskCtrl.deleteTask)

router.route('/task')
    .get(TaskCtrl.findAll)
    .post(TaskCtrl.addTask)

/* Perfil */ 

router.route('/:username')
    .get(function(req,res,next){
        var params_user = req.params.username
        User.findOne({ username: params_user }, function(err, profile){   
           if(err){
                return res.render(error)
            }
            if(!profile){
                return res.redirect('/app')
            }
            Task.find({grade: res.locals.user.grade}, function(err, tasks){
                if(err){res.redirect('/app'); return}
                res.render(profile.typeuser +'/profile/index',{profile: profile,tasks: tasks})
            })
        })
        
    })
    .put(function(req,res){
        if(res.locals.user.grade == null){
            var grade = req.body.grado + '-' + req.body.salon
        }else{
            var grade = req.body.grado
        }

        res.locals.user.fullname = req.body.fullname
        res.locals.user.email = req.body.email
        res.locals.user.school = req.body.school
        res.locals.user.matter = req.body.matter
        res.locals.user.grade = grade
        res.locals.user.save(function(err){
            if(!err){
                res.redirect('/app/'+req.params.username)
            }else{
                res.redirect('/app/'+req.params.username+'/edit')
            }
        })
    })

router.route('/:username/edit')
    .get(function(req,res){
        if(req.params.username != res.locals.user.username){
            return res.redirect('/app')
        }
        res.render(res.locals.user.typeuser + '/profile/edit',{ title: 'Editar nota - Proschool'})
    })

module.exports = router;