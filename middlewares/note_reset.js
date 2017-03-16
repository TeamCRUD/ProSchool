var Task = require('../models/tasks');
var User = require('../models/users');

 /**RENDER */
exports.renderNewNote = function(req, res){
    User.find({grade: res.locals.user.grade, typeuser: 'Estudiante'}, function(err, students){
        if(err){return res.redirect('/app')}
        res.render('Profesor/note/new', {title: 'Nueva tarea - Proschool', students: students});
    })
}

exports.renderEditNote = function(req, res){
    res.render('Profesor/note/edit',{ title: 'Editar nota - Proschool'})
}

/** RESET */
exports.findAll = function (req,res){
    if(res.locals.user.typeuser != 'Profesor'){
        Task.find({grade: res.locals.user.grade, student: res.locals.user.username}, function(err, tasks){
            var profesor = req.params.username
            if(err){ res.redirect('/app'); return}
            res.render(res.locals.user.typeuser + '/note/index', {title: 'Mis notas - Proschool', tasks: tasks, profesor: profesor})
        })
    }else{
        Task.find({student: req.params.username}, function(err, tasks){
            if(err){ res.redirect('/app'); return}
            res.render('Profesor/note/index', {title: 'Historial - Proschool', tasks: tasks})
        })
    }
}

exports.addNote = function(req, res){
    if(req.body.student == 'vacio'){
        return res.redirect('/app/note/new/'+req.params.id)
    }
    if(req.body.note > 10 || req.body.note == ''){
        return res.redirect('/app/note/new/'+req.params.id)
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
            res.redirect('/app/task/new')
            return res.status(500).send()
        }else{
            res.redirect('/app/task/' + task._id)
            return res.status(200).send()
        }
    })
}

exports.updateNote = function(req,res){
    res.locals.task.note = req.body.note
    res.locals.task.save(function(err){
        if(!err){
            res.redirect('/app/task/'+req.params.id)
        }else{
            res.render('Profesor/task/'+req.params.id+'/edit')
        }
    })
}

exports.deleteNote = function(req,res){
    Task.findOneAndRemove({_id: req.params.id}, function(err){
        if(!err){
            res.redirect('/app/task')
        }else{
            console.log(err)
            res.redirect('/app/notas/'+re.params.id)
        }
    })
}
/*router.route('/notas/:id')
    .post(task_find, function(req,res){
        if(req.body.task == ''){
            return res.redirect('/app/notas/new')
        }
        var data = {
            period: res.locals.task.period,
            task: res.locals.task.task,
            grade: res.locals.task.grade,
            note: req.body.note,
            student: req.body.student,
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
    
router.get('/notas/new/:id',task_find,function(req,res){
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
    })*/