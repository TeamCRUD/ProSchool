var express = require('express');
var router = express.Router();

var ListCtrl = require('../controllers/list')

router.route('/')
    .get(ListCtrl.allStudent)

module.exports = router;