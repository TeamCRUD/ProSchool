var express = require('express');
var router = express.Router();

var School = require('../models/schools');
var Task = require('../models/tasks');
var Nota = require('../models/notas');
var User = require('../models/users');

var TaskCtrl = require('../middlewares/task_reset')
var nota_find = require('../middlewares/find_nota')

/* GET app page. */
router.get('/', function(req, res, next) {
    if(res.locals.user.typeuser == null){
       return res.redirect('/');
    }
    if(res.locals.user.typeuser == 'Estudiante' || res.locals.user.typeuser == 'Acudiente'){
        Task.find({grade: res.locals.user.grade},function(err,notas){
            if(err){
                return res.redirect('/app')
            }
            res.render(res.locals.user.typeuser+'/home',{title: 'Proschool - Home', notas: notas})
        })
    }else{
        Nota.find({})
            .populate('profesor')
            .exec(function(err,notas){
                if(err) console.log(err)
                res.render('Profesor/home', {title: 'Home - Proschool', notas: notas})
            })
    }
});

/* REST */
router.all('/notas', function(req, res, next){
    if(res.locals.user.typeuser!= 'Profesor'){
        res.redirect('/app')
    }else{
        next()
    }
})

router.all('/notas/*', function(req,res,next){
    if(res.locals.user.typeuser!= 'Profesor'){
        res.redirect('/app')
    }else{
        next()
    }
})

router.get('/notas/new',function(req,res){
    res.render('Profesor/notas/new',{ title: 'Nueva nota - Proschool'})
})

router.all('/notas/:id*', nota_find)

router.get('/notas/:id/edit',function(req,res){
    res.render('Profesor/notas/edit',{ title: 'Editar nota - Proschool'})
})

router.route('/notas/:id')
    .get(function(req,res){
        res.render('Profesor/notas/show',{title: res.locals.nota.task + ' - Proschool'})
    })
    .put(function(req,res){
        res.locals.nota.period = req.body.period
        res.locals.nota.task = req.body.task
        res.locals.nota.grade = req.body.grade
        res.locals.nota.save(function(err){
            if(!err){
                res.render('Profesor/notas/show')
            }else{
                res.render('Profesor/notas/'+req.params.id+'/edit')
            }
        })
    })
    .delete(function(req,res){
        Nota.findOneAndRemove({_id: req.params.id}, function(err){
            if(!err){
                res.redirect('/app/notas')
            }else{
                console.log(err)
                res.redirect('/app/notas/'+re.params.id)
            }
        })
    })

router.route('/notas')
    .get(function(req,res){
        User.find({grade: res.locals.user.grade}, function(err,students){
            if(err){
                return res.redirect('/app')
            }
            res.render('Profesor/notas/index', {title: 'Historial - Proschool', students: students})
        })
    })
    .post(function(req,res){
        if(req.body.task == ''){
            return res.redirect('/app/notas/new')
        }
        var data = {
            period: req.body.period,
            task: req.body.task,
            grade: req.body.grade,
            teacher: {
                fullname: res.locals.user.fullname,
                username: res.locals.user.username
            },
            profesor: res.locals.user._id
        }
        var nota = new Nota(data)
        nota.save(function(err){
            if(err){
                res.redirect('/app/notas/new')
                return res.status(500).send()
            }else{
                res.redirect('/app/notas/' + nota._id)
                return res.status(200).send()
            }
        })
    })

/* Estudiante */
router.get('/list',function(req,res,next){
   if(res.locals.user.typeuser == 'Estudiante' || res.locals.user.typeuser == 'Acudiente'){
        Nota.find({student: res.locals.user.username},function(err,notas){
            if(err){
                return res.redirect('/app')
            }
            res.render(res.locals.user.typeuser+'/notas/index',{title: 'Proschool - Home', notas: notas})
        })
    }else{
        next()
    }
})

/* Perfil */ 
router.route('/:username')
    .get(function(req,res,next){
        var params_user = req.params.username
        User.findOne({ username: params_user }, function(err, profile){   
           if(err){
                return res.redirect('/app')
            }
            if(!profile){
                return res.redirect('/app')
            }
            Task.find({}, function(err, tasks){
                if(err){res.redirect('/app'); return}
                res.render(profile.typeuser +'/profile/index',{profile: profile,tasks: tasks})
            })
        })
        
    })
    .put(function(req,res){
        res.locals.user.fullname = req.body.fullname
        res.locals.user.email = req.body.email
        res.locals.user.school = req.body.school
        res.locals.user.grade = req.body.grade
        res.locals.user.save(function(err){
            if(!err){
                res.redirect('/app/'+req.params.username)
            }else{
                res.render('/app/'+req.params.username+'/edit')
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
    
/**Reset Task */
router.get('/task/new', TaskCtrl.renderNewTask)

router.get('/task/:id/edit', TaskCtrl.renderEditTask)

router.route('/task/:id')
    .get(TaskCtrl.renderShowTask)
    .put(TaskCtrl.updateTask)
    .delete()

router.route('/task')
    .get()
    .post(TaskCtrl.addTask)

module.exports = router;