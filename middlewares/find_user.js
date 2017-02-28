var User = require("../models/users")

module.exports = function(req, res, next){
    if(res.locals.user.typeuser == "admin"){
        User.find({typeuser: req.params.typeuser}, function(err, users){
            if(err){
                return res.redirect("/admin")
            }
            res.locals.users = users
            next()
        })
    }
    if(res.locals.user.typeuser == "school"){
        User.find({typeuser: req.params.typeuser, school: res.locals.user.school}, function(err, users){
            if(err){
                return res.redirect("/admin")
            }
            res.locals.users = users
            next()
        })
    }
}