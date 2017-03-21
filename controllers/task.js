var User = require('../models/users');
var Task = require('../models/tasks');

//CRUD
exports.addTask = function(req, res){
    var data = {
        period: req.body.period,
        grade: req.body.grade,
        task: req.body.task,
        porcentage: req.body.porcentage,
        matter: res.locals.user.matter,
        teacher: {
            fullname: res.locals.user.fullname,
            username: res.locals.user.username
        },
        profesor: res.locals.user._id
    }

    var task = new Task(data)

    task.save(function(err){
        if(err){
            res.redirect('/task/new')
            return res.status(500).send()
        }else{
            res.redirect('/app/task/' + task._id)
            return res.status(200).send()
        }
    })
}

exports.findAll = function (req,res,next){
    if(res.locals.user.typeuser == 'Estudiante' || res.locals.user.typeuser == 'Acudiente'){
        User.find({grade: res.locals.user.grade}, function(err,teachers){
            if(err){
                return res.redirect('/home')
            }
            res.render(res.locals.user.typeuser + '/task/index', {title: 'Mis notas - Proschool', teachers: teachers})
        })
    }else{
        if(res.locals.user.typeuser == 'Profesor' || res.locals.user.typeuser == 'school'){
            User.find({grade: res.locals.user.grade}, function(err,students){
                if(err){
                    return res.redirect('/home')
                }
                Task.find({profesor: res.locals.user._id}, function(err, tasks){
                    if(err){ res.redirect('/home'); return}
                    res.render('Profesor/task/index', {title: 'Historial - Proschool', students: students , tasks: tasks})
                })
            })
        }else{
            res.redirect("/home")
        }
    }
}

exports.deleteTask = function(req,res){
    Task.findOneAndRemove({_id: req.params.id}, function(err){
        if(!err){
            res.redirect('/home')
        }else{
            console.log(err)
            res.redirect('/task/'+re.params.id)
        }
    })
}
//Render views

exports.renderShowTask = function(req, res){
    res.render('task/show')
}

exports.renderNewTask = function(req, res){
    if(res.locals.user.typeuser == 'Profesor'){
        res.render('task/new',{title: 'Nueva tarea'})
    }else{
        res.redirect('/home')
    }
}

exports.renderEditTask = function(req, res){
    if(res.locals.user.typeuser == 'Profesor'){
        res.render('task/new',{title: 'Nueva tarea'})
    }else{
        res.redirect('/home')
    }
}