var express = require('express');
var router = express.Router();

var Nota = require('../models/notas');
var User = require('../models/users');

/* GET app page. */
router.get('/', function(req, res, next) {
    if(res.locals.user.typeuser == 'Estudiante' || res.locals.user.typeuser == 'Acudiente'){
        res.render(res.locals.user.typeuser+'/home',{title: 'Proschool - Home'})
    }else{
        res.render('app/home', {title: 'Home - Proschool'})
    }
});

/* REST */
router.get('/notas/new',function(req,res){
    res.render('app/notas/new',{ title: 'Nueva nota - Proschool'})
})

router.get('/notas/:id/edit',function(req,res){
    Nota.findById(req.params.id,function(err,nota){
        res.render('app/notas/edit',{ title: 'Editar nota - Proschool', nota: nota})
    })
})

router.route('/notas/:id')
    .get(function(req,res){
        Nota.findById(req.params.id,function(err,nota){
            res.render('app/notas/show',{title: nota.periodo + ' - Proschool',nota: nota})
        })
    })
    .put(function(req,res){
        Nota.findById(req.params.id, function(err,nota){
            nota.periodo = req.body.periodo
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
        Nota.findOneAndRemove({_id: req.params.id}, function(err){
            if(!err){
                res.redirect('/app/notas')
            }else{
                console.log(err)
                res.redirect('/app/notas/'+re.params.id)
            }
        })
    })

router.route('/notas')
    .get(function(req,res){
        Nota.find({},function(err,notas){
            if(err){
                return res.redirect('/app')
            }
            res.render('app/notas/index', {title: 'Historial - Proschool', notas: notas })
        })
    })
    .post(function(req,res){
        var data = {
            periodo: req.body.periodo
        }

        var nota = new Nota(data)

        nota.save(function(err){
            if(!err){
                res.redirect('/app/notas/' + nota._id)
            }else{
                res.render(err)
            }
        })
    })
module.exports = router;