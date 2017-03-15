var express = require('express');
var router = express.Router();

var Task = require('../models/tasks');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(res.locals.user.typeuser == 'Estudiante' || res.locals.user.typeuser == 'Acudiente'){
      Task.find({grade: res.locals.user.grade},function(err,tasks){
          if(err){
              return res.redirect('/app')
          }
          res.render('home', { title: 'Proschool', tasks: tasks });
      })
  }else{
      Task.find({})
          .populate('profesor')
          .exec(function(err,tasks){
              if(err) console.log(err)
              res.render('home', { title: 'Proschool', tasks: tasks });
          })
  }
  
});

module.exports = router;