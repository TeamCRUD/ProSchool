var Task = require('../models/tasks');

module.exports = function(req, res, next){
    Task.findById(req.params.id, function(err, task){
        if(task != null){
            res.locals.task = task;
            next()
        }else{
            res.redirect('/app')
        }
    })
}