var Nota = require('../models/notas');
var owner_check = require('./nota_permission')

module.exports = function(req,res,next){
    Nota.findById(req.params.id)
        .populate('profesor')
        .exec(function(err,nota){
            if(nota != null && owner_check(nota, req, res)){
                res.locals.nota = nota
                next()
            }else{
                res.redirect('/app')
            }
        })
}