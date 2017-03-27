var Task = require('../models/tasks');
var School = require('../models/schools');

exports.renderUser = function(req, res, next) {
    if(res.locals.user.typeuser == 'Acudiente'){
       Task.find({student: res.locals.user.son},function(err,tasks){
            if(err){
                return res.redirect('/app')
            }
            res.render('user/default', { title: 'Inicio', tasks: tasks, profile: true });
        }) 
    }
    if(res.locals.user.typeuser == 'Estudiante'){
        Task.find({grade: res.locals.user.grade},function(err,tasks){
            if(err){
                return res.redirect('/app')
            }
            res.render('user/default', { title: 'Inicio', tasks: tasks, profile: true });
        })
    }
    if(res.locals.user.typeuser == 'Profesor' || res.locals.user.typeuser == 'school'){
        Task.find({})
            .populate('profesor')
            .exec(function(err,tasks){
                if(err) console.log(err)
                res.render('user', { title: 'Inicio', tasks: tasks , profile: true});
            })
        }
    if(res.locals.user.typeuser == 'admin'){
        res.render('user/default', { title: 'Inicio - admin', profile: true});
    }
}

exports.renderEditUser = function(req,res){
    School.find({}, function(err,schools){
        if(err){
            return res.redirect("school")
        }
        res.render('user/edit',{ title: 'Editar perfil - Proschool', schools: schools})
    })
}

//CRUD
exports.updateUser = function(req,res){
    if(res.locals.user.typeuser == 'Acudiente'){
        res.locals.user.son = req.body.son
    }else{
        if(req.body.school == "vacio" || req.body.matter == "vacio" || req.body.grado == "vacio" || req.body.salon == "vacio"){
            return res.redirect('/user/edit')
        }
        if(res.locals.user.grade == null){
            var grade = req.body.grado + '-' + req.body.salon
        }else{
            var grade = req.body.grado
        }
    }
    res.locals.user.fullname = req.body.fullname
    res.locals.user.email = req.body.email
    res.locals.user.school = req.body.school
    res.locals.user.matter = req.body.matter
    res.locals.user.grade = grade
    res.locals.user.save(function(err){
        if(!err){
            res.redirect('/user')
        }else{
            res.redirect('/user/edit')
        }
    })
}