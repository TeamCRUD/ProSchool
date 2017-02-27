var Admin = require('../models/admin');

exports.renderSingleTypeuser = function(req, res, next) {
  res.render('admin/school/'+req.params.typeuser, { title: req.params.typeuser});
}

exports.renderSingupUser = function(req, res, next) {
  res.render('admin/user', { title: 'Admin - Proschool' });
}

exports.allUser = function(req, res, next){

}

exports.addUser = function(req, res, next) {
    var data = {
        username: req.body.username,
        password: req.body.password
    }

    var admin = new Admin(data)
    admin.save().then(function(us){
        res.send("Guardamos el Admin")
    }), function(err){
        res.send("No pudimos guardar")
    }
}