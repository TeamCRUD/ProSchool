var User = require("../models/users")

module.exports = function(req, res, next){
    User.find({typeuser: req.params.typeuser}, function(err, users){
        if(err){
            return res.redirect("/admin")
        }
        res.locals.users = users
        next()
    })
}