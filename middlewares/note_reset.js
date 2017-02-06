var Task = require('../models/tasks');

 /**RENDER */
exports.renderNewNote = function(req, res){
    res.render('Profesor/note/new',{title: 'Nueva tarea - Proschool'})
}
exports.renderEditNote = function(req, res){
    res.render('Profesor/note/edit',{ title: 'Editar nota - Proschool'})
}

/** RESET */
exports.findAll = function (req,res){
    if(res.locals.user.typeuser != 'Profesor'){
        Task.find({student: res.locals.user.username},function(err,notas){
            if(err){
                return res.redirect('/app')
            }
            res.render(res.locals.user.typeuser+'/notas/index',{title: 'Proschool - Home', notas: notas})
        })
    }else{
        Task.find({student: req.params.username}, function(err, tasks){
            if(err){ res.redirect('/app'); return}
            res.render('Profesor/note/index', {title: 'Historial - Proschool', tasks: tasks})
        })
    }
}

exports.addNote = function(req, res){
    var data = {
        period: res.locals.task.period,
        task: res.locals.task.task,
        grade: res.locals.task.grade,
        student: req.body.student,
        note: req.body.note,
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