var Nota = require('../models/notas')

module.exports = function(nota, req, res){
    if(req.method === 'GET' && req.path.indexOf('edit') < 0){
        return true
    }

    if(typeof nota.profesor == "undefined") return false
    
    if(nota.profesor._id.toString() == res.locals.user._id){
        return true
    }

    return false
}