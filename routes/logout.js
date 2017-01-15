var express = require('express');
var router = express.Router();

/* Logout */
router.get('/', function(req, res, next) {
    req.session.destroy()
    res.redirect('/')
});

module.exports = router;