var express = require('express');
var router = express.Router();

var UserCtrl = require("../controllers/user")

/* GET user page. */
router.route('/')
    .get(UserCtrl.renderUser)
    .put(UserCtrl.updateUser)

router.get('/edit', UserCtrl.renderEditUser);

module.exports = router;
