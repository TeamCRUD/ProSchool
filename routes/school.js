var express = require('express');
var router = express.Router();

var SchoolCtrl = require("../controllers/school")
var user_find = require("../middlewares/find_user")

router.get('/', function(req, res, next) {
  res.render('school/index', { title: 'Proschool'});
});

router.route("/:typeuser")
  .get(user_find, SchoolCtrl.renderSingleTypeuser)

router.route("/profile/:username")
  .get(SchoolCtrl.renderProfile)

module.exports = router;