var express = require('express');
var router = express.Router();

var SchoolCtrl = require("../controllers/school")
var user_find = require("../middlewares/find_user")

router.route("/:typeuser")
  .get(user_find, SchoolCtrl.renderSingleTypeuser)

module.exports = router;