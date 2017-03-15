var User = require('../models/users');

exports.renderSingleTypeuser = function(req, res, next) {
  res.render('admin/school/'+req.params.typeuser, { title: req.params.typeuser});
}

exports.renderSingupUser = function(req, res, next) {
  res.render('admin/user/new', { title: 'Admin - Proschool' });
}

exports.renderProfile = function(req, res, next){
    res.render("admin/profile", {title: res.locals.user.username})
}

exports.allUser = function(req, res, next){
    User.find({}, function(err,admins){
        if(err){return res.redirect("/admin")}
        res.render("admin/user/index", {title: "admin", admins: admins})
    })
}

exports.addUser = function(req, res, next) {
    var data = {
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        typeuser: "admin"
    }

    var user = new User(data)
    user.save().then(function(us){
        res.send("Guardamos el Admin")
    }), function(err){
        res.send("No pudimos guardar")
    }
}