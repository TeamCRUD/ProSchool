var Task = require('../models/tasks');
var User = require('../models/users');

 /**RENDER */
exports.renderNewNote = function(req, res){
    User.find({grade: res.locals.user.grade, typeuser: 'Estudiante'}, function(err, students){
        if(err){return res.redirect('/app')}
        res.render('note/new', {title: 'Nueva tarea - Proschool', students: students});
    })
}

exports.renderEditNote = function(req, res){
    res.render('note/edit',{ title: 'Editar nota - Proschool'})
}

/** RESET */
exports.findAll = function (req,res){
    if(res.locals.user.typeuser != 'Profesor'){
        Task.find({grade: res.locals.user.grade, student: res.locals.user.username}, function(err, tasks){
            var profesor = req.params.username
            if(err){ res.redirect('/app'); return}
            res.render('note/index', {title: 'Mis notas - Proschool', tasks: tasks, profesor: profesor})
        })
    }else{
        Task.find({student: req.params.username}, function(err, tasks){
            if(err){ res.redirect('/home'); return}
            res.render('Profesor/note/index', {title: 'Historial - Proschool', tasks: tasks})
        })
    }
}

exports.findStudentNote = function(req, res){
    if(res.locals.user.typeuser != 'Profesor'){
        Task.find({grade: res.locals.user.grade, student: res.locals.user.username}, function(err, tasks){
            var profesor = req.params.username
            if(err){ res.redirect('/app'); return}
            res.render('note/index', {title: 'Mis notas - Proschool', tasks: tasks, profesor: profesor})
        })
    }else{
        Task.find({student: req.params.username}, function(err, tasks){
            if(err){ res.redirect('/app'); return}
            res.render('note/index', {title: 'Historial - Proschool', tasks: tasks})
        })
    }
} 

exports.addNote = function(req, res){
    if(req.body.student == 'vacio'){
        return res.redirect('/note/new/'+req.params.id)
    }
    if(req.body.note > 10 || req.body.note == ''){
        return res.redirect('/note/new/'+req.params.id)
    }
    var data = {
        period: res.locals.task.period,
        task: res.locals.task.task,
        grade: res.locals.task.grade,
        student: req.body.student,
        note: req.body.note,
        porcentage: res.locals.task.porcentage,
        matter: res.locals.task.matter,
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
            res.redirect('/task/' + task._id)
            return res.status(200).send()
        }
    })
}

exports.updateNote = function(req,res){
    res.locals.task.note = req.body.note
    res.locals.task.save(function(err){
        if(!err){
            res.redirect('/task/'+req.params.id)
        }else{
            res.render('task/'+req.params.id+'/edit')
        }
    })
}

exports.deleteNote = function(req,res){
    Task.findOneAndRemove({_id: req.params.id}, function(err){
        if(!err){
            res.redirect('/list')
        }else{
            console.log(err)
            res.redirect('/notas/'+re.params.id)
        }
    })
}