var Task = require('../models/tasks');
var User = require('../models/users');

/** RENDER */
exports.renderShowTask = function(req, res){
    res.render('Profesor/task/show')
}

exports.renderNewTask = function(req, res){
    res.render('Profesor/task/new',{title: 'Nueva tarea - Proschool'})
}

exports.renderEditTask = function(req, res){
    res.render('Profesor/task/edit')
}

/** RESET */
exports.findAll = function (req,res){
    if(res.locals.user.typeuser == 'Estudiante' || res.locals.user.typeuser == 'Acudiente'){
        User.find({grade: res.locals.user.grade}, function(err,teachers){
            if(err){
                return res.redirect('/app')
            }
            Task.find({teacher: {username: req.params.username}}, function(err, tasks){
                if(err){ res.redirect('/app'); return}
                res.render(res.locals.user.typeuser + '/task/index', {title: 'Historial - Proschool', teachers: teachers , tasks: tasks})
            })
        })
    }else{
       User.find({grade: res.locals.user.grade}, function(err,students){
            if(err){
                return res.redirect('/app')
            }
            Task.find({profesor: res.locals.user._id}, function(err, tasks){
                if(err){ res.redirect('/app'); return}
                res.render('Profesor/task/index', {title: 'Historial - Proschool', students: students , tasks: tasks})
            })
        })
    }
}

exports.addTask = function(req, res){
    if(req.body.task == '' || req.body.grade == null){
        return res.redirect('/app/task/new')
    }
    var data = {
        period: req.body.period,
        grade: req.body.grade,
        task: req.body.task,
        porcentage: req.body.porcentage,
        teacher: {
            fullname: res.locals.user.fullname,
            username: res.locals.user.username
        },
        profesor: res.locals.user._id
    }

    var task = new Task(data)

    task.save(function(err){
        if(err){
            res.redirect('/app/task/new')
            return res.status(500).send()
        }else{
            res.redirect('/app/task/' + task._id)
            return res.status(200).send()
        }
    })
}

exports.updateTask = function(req,res){
    res.locals.task.period = req.body.period
    res.locals.task.task = req.body.task
    res.locals.task.grade = req.body.grade
    res.locals.task.save(function(err){
        if(!err){
            res.redirect('/app/task/'+req.params.id)
        }else{
            res.render('Profesor/task/'+req.params.id+'/edit')
        }
    })
}

exports.deleteTask = function(req,res){
    Task.findOneAndRemove({_id: req.params.id}, function(err){
        if(!err){
            res.redirect('/app')
        }else{
            console.log(err)
            res.redirect('/app/task/'+re.params.id)
        }
    })
}

/**Permission task */
exports.taskPermission = function(req, res, next){
    if(res.locals.user.typeuser != 'Profesor'){
        console.log(res.locals.user.typeuser)
        res.redirect('/app')
    }else{
        next()
    }
}