var express = require('express');
var router = express.Router();

var UserCtrl = require("../controllers/user")

/* GET user page. */
router.get('/', UserCtrl.renderUser);

module.exports = router;
