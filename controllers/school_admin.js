var School = require('../models/schools');

exports.allSchool = function(req, res, next) {
    School.find({},function(err,schools){
        if(err){
            return res.redirect("/admin")
        }
        res.render("admin/school/index", {title: "Admin", schools: schools})
    })
}

exports.addSchool = function(req, res, next) {
    var data = {
        school: req.body.school,
        username: req.body.username,
        password: req.body.password,
        typeuser: "school"
    }

    var school = new School(data)
    school.save().then(function(us){
        res.send("Guardamos el Admin")
    }, function(err){
        res.send("No Guardamos")
    })
}
