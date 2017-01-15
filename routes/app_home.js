var express = require('express');
var router = express.Router();

/* Logout */
router.get('/', function(req, res, next) {
    res.render('app/home', {title: 'Proschool'})
});

module.exports = router;