var Task = require('../models/tasks')

module.exports = function(task, req, res){
    if(req.method === 'GET' && req.path.indexOf('edit') < 0){
        return true
    }

    if(typeof task.profesor == "undefined") return false
    
    if(task.profesor._id.toString() == res.locals.user._id){
        return true
    }

    return false
}