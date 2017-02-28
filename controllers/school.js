var School = require('../models/schools');

exports.allSchool = function(req, res, next) {
    School.find({},function(err,schools){
        if(err){
            return res.redirect("/admin")
        }
        res.render("admin/school/index", {title: "Admin", schools: schools})
    })
}

exports.renderSingleTypeuser = function(req, res, next) {
  res.render('school/'+req.params.typeuser, { title: req.params.typeuser});
}