var School = require('../models/schools');

exports.allSchool = function(req, res, next) {
    School.find({},function(err,schools){
        if(err){
            return res.redirect("/admin")
        }
        res.render("admin/school/index", {title: "Admin", schools: schools})
    })
}