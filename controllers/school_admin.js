var School = require('../models/schools');

exports.renderSingupSchool = function(req, res, next) {
  res.render('admin/school', { title: 'Admin - Proschool' });
}

exports.addSchool = function(req, res, next) {
    var data = {
        school: req.body.school,
        username: req.body.username,
        password: req.body.password
    }

    var school = new School(data)
    school.save().then(function(us){
        res.send("Guardamos el Admin")
    }), function(err){
        res.send("No pudimos guardar")
    }
}
