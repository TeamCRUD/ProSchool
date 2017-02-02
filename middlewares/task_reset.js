var Task = require('../models/tasks');

/** RENDER */
exports.renderShowTask = function(req, res){
        res.render('Profesor/task/show')
}

exports.renderNewTask = function(req, res){
    res.render('Profesor/task/new')
}

exports.renderEditTask = function(req, res){
        res.render('Profesor/task/edit')
}

/** RESET */
exports.findAll = function (req,res){
    Task.find({}, function(err, tasks){
    })
}
exports.addTask = function(req, res){
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
    res.loctask.period = req.body.period
    res.loctask.task = req.body.task
    res.loctask.grade = req.body.grade
    res.loctask.save(function(err){
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
    if(res.locals.user.typeuser!= 'Profesor'){
        res.redirect('/app')
    }else{
        next()
    }
}