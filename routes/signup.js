var express = require('express');
var router = express.Router();

var User = require('../models/users');

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign up - Proschool' });
});

/* POST signup page. */
router.post('/', function(req, res, next) {
  var user = new User({
      fullname: req.body.fullname,
      lastname: req.body.lastname,
      email: req.body.email,
      typeuser: req.body.typeuser,
      username: req.body.username,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation
  });
  user.save(function(err){
      if(err){
        res.redirect('/signup')
        return res.status(500).send()
      }else{
        res.redirect('/')
        return res.status(200).send()
      }
  })
});

module.exports = router;