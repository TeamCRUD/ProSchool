var express = require('express');
var router = express.Router();

var Nota = require('../models/notas')
var nota_finder_middleware = require('../middlewares/find_nota')

/* GET app page. */
router.get('/', function(req, res, next) {
    Nota.find({})
        .populate('profesor')
        .exec(function(err, notas){
            if(err) console.log(err)
            res.render('app/home', {title: 'Proschool - Home', notas: notas})
        })
});


/* RESET */
router.get('/notas/new',function(req,res){
    res.render('app/notas/new', {title: 'Proschool - Nueva nota'})
})

router.all('/notas/:id*', nota_finder_middleware)

router.get('/notas/:id/edit',function(req,res){
    res.render('app/notas/edit',{title: 'Proschool - Editar nota'})
})

router.route("/notas/:id")
    .get(function(req,res){
        res.render('app/notas/show',{title: 'Proschool - Notas'})
    })
    .put(function(req,res){
        res.locals.nota.periodo = req.body.periodo
        res.locals.nota.nota = req.body.nota
        nota.save(function(err){
            if(!err){
                res.render('app/notas/show')
            }else{
                res.render('app/notas/'+req.params.id+'/edit')
            }
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
        Nota.find({profesor: res.locals.user._id},function(err,notas){
            if(err){
               return res.redirect('/app')
            }
            res.render('app/notas/index',{title: 'Proschool - Notas', notas: notas})
        })
    })
    .post(function(req,res){
        
        var data = {
            periodo: req.body.periodo,
            nota: req.body.nota,
            profesor: res.locals.user._id
        }

        var nota = new Nota(data)

        nota.save(function(err){
            if(!err){
                res.redirect('/app/notas/'+nota._id);
            }
            else{
                res.render(err);
                console.log(nota)
            }
        })
    })

module.exports = router;