var User = require('../models/users');
//CRUD
exports.addSchool = function(req, res, next) {
    var data = {
        fullname: req.body.school,
        school: req.body.school,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        typeuser: "school"
    }

    var user = new User(data)
    user.save().then(function(us){
        res.send("Guardamos el Admin")
    }, function(err){
        res.send("No Guardamos")
    })
}

exports.allSchool = function(req, res, next) {
    User.find({typeuser: 'school'},function(err,schools){
        if(err){
            return res.redirect("/admin")
        }
        res.render("admin/school/index", {title: "Admin", schools: schools})
    })
}

exports.allUser = function(req, res, next){
    User.find({typeuser: 'admin'}, function(err,admins){
        if(err){return res.redirect("/admin")}
        res.render("admin/user/index", {title: "admin", admins: admins})
    })
}

