var Task = require('../models/tasks');

if(req.method == 'GET' && req.path.indexOf('edit') < 0){
    return true
}

if(task.profesor._id.toString() == res.locals.user._id){
    return true
}

return false