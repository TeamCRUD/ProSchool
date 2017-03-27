var express = require('express');
var router = express.Router();

var AdminCtrl = require("../controllers/user_admin")
var SchoolCtrl = require("../controllers/school_admin")
var NewCtrl = require("../controllers/admin")

var user_find = require("../middlewares/find_user")

/* GET signup page. */
router.get('/', function(req, res, next) {
    res.render('admin/index', { title: 'Admin - Proschool' });
})

router.get("/user/new", function(req, res){
  res.render("admin/user/new")
})

router.route('/user') 
  .get(NewCtrl.allUser)
  .post(AdminCtrl.addUser)

router.get("/school/new", function(req, res){
  res.render("admin/school/new_school")
})

router.route("/school")
  .get(NewCtrl.allSchool)
  .post(NewCtrl.addSchool)

router.route("/school/:typeuser")
  .get(user_find, AdminCtrl.renderSingleTypeuser)

router.route("/profile/:username")
  .get(AdminCtrl.renderProfile)

module.exports = router;