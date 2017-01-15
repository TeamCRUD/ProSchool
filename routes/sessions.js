var express = require('express');
var router = express.Router();

var User = require('../models/users');

/* POST sessions page. */
router.post('/', function(req, res, next) {
    User.findOne({username: req.body.username, password: req.body.password}, function(err,user){
       req.session.user_id = user._id;
       res.redirect('/app')
    })
});

module.exports = router;