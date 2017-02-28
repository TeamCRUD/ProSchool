var School = require('../models/schools')

module.exports = function(req, res, next){
    if(!req.session.user_id){
        res.redirect('/')
    }
    else{
        School.findById(req.session.user_id, function(err,user){
            if(err){
                console.log(err)
                res.redirect('/')
            }else{
                res.locals = { user: user }
                next()
            }
        })
    }
}