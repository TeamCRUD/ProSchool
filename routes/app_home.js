var express = require('express');
var router = express.Router();

var Nota = require('../models/notas');
var User = require('../models/users');
var nota_finder_middleware = require('../middlewares/find_nota')

/* GET app page. */
router.get('/', function(req, res, next) {
    if(res.locals.user.typeuser == 'Estudiante' || res.locals.user.typeuser == 'Acudiente'){
        res.render(res.locals.user.typeuser+'/home',{title: 'Proschool - Home'})
    }else{
        Nota.find({})
            .populate('profesor')
            .exec(function(err, notas){
                if(err) console.log(err)
                res.render('app/home', {title: 'Proschool - Home', notas: notas})
            })
    }
});


/* RESET */
router.all('/notas',function(req,res){
    if(res.locals.user.typeuser!='Profesor'){
        res.redirect('/app')
    }
})
router.all('/notas/*',function(req,res){
    if(res.locals.user.typeuser!='Profesor'){
        res.redirect('/app')
    }
})
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
        res.locals.nota.description = req.body.description
        res.locals.nota.nota = req.body.nota
        res.locals.nota.save(function(err){
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
        User.findOne({username: req.body.student}, function(err,user){
            if(err){
                console.log(err);
                return res.status(500).send()
            }
            if(!user){
                return res.status(404).redirect('/app/notas/new')
            }else{
                var data = {
                    periodo: req.body.periodo,
                    description: req.body.description,
                    nota: req.body.nota,
                    student: {
                        name: user.name,
                        lastname: user.lastname,
                        username: user.username
                    },
                    profesor: res.locals.user._id
                }
                
                var nota = new Nota(data)

                nota.save(function(err){
                    if(!err){
                        res.redirect('/app/notas/' + nota._id);
                    }
                    else{
                        res.render(err);
                        console.log(nota)
                    }
                })
            }
        })
    })

module.exports = router;