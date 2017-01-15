var express = require('express');
var router = express.Router();

var Nota = require('../models/notas')

/* GET app page. */
router.get('/', function(req, res, next) {
    res.render('app/home', {title: 'Proschool - Home'})
});


/* RESET */
router.get('/notas/new',function(req,res){
    res.render('app/notas/new', {title: 'Proschool - Nueva nota'})
})

router.get('/notas/:id/edit',function(req,res){

})

router.route("/notas/:id")
    .get(function(req,res){
       Nota.findById(req.params.id,function(err, nota){
           res.render('app/notas/show',{nota: nota})
       })
    })
    .put(function(req,res){

    })
    .delete(function(req,res){

    })

router.route("/notas")
    .get(function(req,res){
        
    })
    .post(function(req,res){
        var data = {
            periodo: req.body.periodo,
            nota: req.body.nota
        }

        var nota = new Nota(data)

        nota.save(function(err){
            if(!err){
                res.redirect('/app/notas/'+nota._id);
            }
            else{
                res.render(err)
            }
        })
    })

module.exports = router;