var User = require('../models/users');
exports.allStudent = function(req,res){
    User.find({grade: res.locals.user.grade}, function(err,students){
        if(err){
            return res.redirect('/app')
        }
        res.render('list', {title: 'Historial - Proschool', students: students})
    })
}