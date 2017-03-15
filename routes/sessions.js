var express = require('express');
var router = express.Router();

var User = require('../models/users');
var School = require('../models/schools');
var Admin = require('../models/admin');

/* POST sessions page. */
router.post('/', function(req, res, next) {
    User.findOne({username: req.body.username, password: req.body.password}, function(err,user){
        if(err){
            return res.status(500).send()
        }
        if(!user){
            res.redirect('/')
            return res.status(404).send()
        }else{
                req.session.user_id = user._id
                if(user.typeuser == "admin"){
                    return res.redirect('/admin')
                }
                if(user.typeuser == "school"){
                    return res.redirect('/school')
                }
                if(user.typeuser != "school" || user.typeuser != "admin" ){
                    return res.redirect("/app")
                }
        }  
    })
});

module.exports = router;