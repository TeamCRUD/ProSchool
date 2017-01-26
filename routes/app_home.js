var express = require('express');
var router = express.Router();

var Nota = require('../models/notas');
var User = require('../models/users');

var nota_find = require('../middlewares/find_nota')

/* GET app page. */
router.get('/', function(req, res, next) {
    if(res.locals.user.typeuser == 'Estudiante' || res.locals.user.typeuser == 'Acudiente'){
        Nota.find({student: res.locals.user.username},function(err,notas){
            if(err){
                return res.redirect('/app')
            }
            res.render(res.locals.user.typeuser+'/home',{title: 'Proschool - Home', notas: notas})
        })
    }else{
        Nota.find({})
            .populate('profesor')
            .exec(function(err,notas){
                if(err) console.log(err)
                res.render('app/home', {title: 'Home - Proschool', notas: notas})
            })
    }
});

/* REST */
router.all('/notas', function(req, res, next){
    if(res.locals.user.typeuser!= 'Profesor'){
        res.redirect('/app')
    }else{
        next()
    }
})

router.route('/notas/*', function(req,res,next){
    if(res.locals.user.typeuser!= 'Profesor'){
        res.redirect('/app')
    }else{
        next()
    }
})

router.get('/notas/new',function(req,res){
    res.render('app/notas/new',{ title: 'Nueva nota - Proschool'})
})

router.all('/notas/:id*', nota_find)

router.get('/notas/:id/edit',function(req,res){
    res.render('app/notas/edit',{ title: 'Editar nota - Proschool'})
})

router.route('/notas/:id')
    .get(function(req,res){
        res.render('app/notas/show',{title: res.locals.nota.task + ' - Proschool'})
    })
    .put(function(req,res){
        res.locals.nota.period = req.body.period
        res.locals.nota.task = req.body.task
        res.locals.nota.note = req.body.note
        res.locals.nota.student = req.body.student
        res.locals.nota.save(function(err){
            if(!err){
                res.render('app/notas/show')
            }else{
                res.render('app/notas/'+req.params.id+'/edit')
            }
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
        Nota.find({profesor: res.locals.user._id},function(err,notas){
            if(err){
                return res.redirect('/app')
            }
            res.render('app/notas/index', {title: 'Historial - Proschool', notas: notas })
        })
    })
    .post(function(req,res){
        var data = {
            period: req.body.period,
            task: req.body.task,
            note: req.body.note,
            student: req.body.student,
            teacher: res.locals.user.username,
            profesor: res.locals.user._id
        }
        console.log(data)
        var nota = new Nota(data)

        nota.save(function(err){
            if(err){
                    res.redirect('/app/notas/new')
                    return res.status(500).send()
                }else{
                    res.redirect('/app/notas/' + nota._id)
                    return res.status(200).send()
            }
        })
    })
module.exports = router;