var Task = require('../models/tasks');

exports.renderHome = function(req, res, next) {
  if(res.locals.user.typeuser == 'Estudiante' || res.locals.user.typeuser == 'Acudiente'){
      Task.find({grade: res.locals.user.grade},function(err,tasks){
          if(err){
              return res.redirect('/app')
          }
          res.render('home', { title: 'Inicio', tasks: tasks });
      })
  }else{
      if(res.locals.user.typeuser == 'Profesor' || res.locals.user.typeuser == 'school'){
        Task.find({})
            .populate('profesor')
            .exec(function(err,tasks){
                if(err) console.log(err)
                res.render('home', { title: 'Inicio', tasks: tasks });
            })
      }else{
          res.render('home', { title: 'Inicio - admin'});
      }
  }
  
}