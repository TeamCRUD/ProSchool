var User = require('../models/users');
exports.allStudent = function(req,res){
    if(res.locals.typeuser == 'Profesor'){
        User.find({grade: res.locals.user.grade}, function(err,students){
            if(err){
                return res.redirect('/app')
            }
            res.render('list', {title: 'Historial - Proschool', students: students})
        })
    }else{
        User.find({grade: res.locals.user.grade}, function(err,teachers){
            if(err){
                return res.redirect('/home')
            }
            res.render('list', {title: 'Mis notas - Proschool', teachers: teachers})
        })
    }
}