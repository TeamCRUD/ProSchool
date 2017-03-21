var express = require('express');
var router = express.Router();

var HomeCtrl = require("../controllers/home")

/* GET home page. */
router.get('/', HomeCtrl.renderHome);

module.exports = router;