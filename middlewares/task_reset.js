var Task = require('../models/tasks');

exports.renderShowTask = function(req, res){
    Task.findById(req.params.id, function(err, task){
        res.render('Profesor/task/show',{task: task})
    })
}

exports.renderNewTask = function(req, res){
    res.render('Profesor/task/new')
}

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