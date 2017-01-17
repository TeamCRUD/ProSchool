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
    Nota.findById(req.params.id,function(err, nota){
        res.render('app/notas/edit',{title: 'Proschool - Editar nota', nota: nota})
    })
})

router.route("/notas/:id")
    .get(function(req,res){
       Nota.findById(req.params.id,function(err, nota){
           res.render('app/notas/show',{title: 'Proschool - Notas', nota: nota})
       })
    })
    .put(function(req,res){
        Nota.findById(req.params.id,function(err, nota){
            nota.periodo = req.body.periodo
            nota.nota = req.body.nota
            nota.save(function(err){
                if(!err){
                    res.render('app/notas/show',{nota: nota})
                }else{
                    res.render('app/notas/'+nota.id+'/edit',{nota: nota})
                }
            })
        })
    })
    .delete(function(req,res){
        Nota.findByIdAndRemove({_id: req.params.id}, function(err){
            if(!err){
                res.redirect('/app/notas')
            }else{
                console.log(err)
                res.redirect('/app/notas/'+req.params.id)
            }
        })
    })

router.route("/notas")
    .get(function(req,res){
        Nota.find({},function(err,notas){
            if(err){
               return res.redirect('/app')
            }
            res.render('app/notas/index',{title: 'Proschool - Notas', notas: notas})
        })
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