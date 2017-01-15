var express = require('express');
var router = express.Router();

var User = require('../models/users');

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Proschool - Sign up' });
});

/* POST signup page. */
router.post('/', function(req, res, next) {
  var user = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
  });
  user.save(function(){
      res.redirect('/')
  })
});

module.exports = router;