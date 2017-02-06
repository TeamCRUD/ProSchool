var Task = require('../models/tasks');
var owner_check = require('./task_permission')

module.exports = function(req, res, next){
    Task.findById(req.params.id)
        .populate('profesor')
        .exec(function(err, task){
            if(task != null && owner_check(task, req, res)){
                res.locals.task = task;
                next()
            }else{
                res.redirect('/app')
            }
        })
}