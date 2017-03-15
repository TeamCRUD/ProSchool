var User = require('../models/users');

exports.allSchool = function(req, res, next) {
    User.find({},function(err,schools){
        if(err){
            return res.redirect("/admin")
        }
        res.render("admin/school/index", {title: "Admin", schools: schools})
    })
}

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
