var express = require('express');
var router = express.Router();

var AdminCtrl = require("../controllers/user_admin")
var SchoolCtrl = require("../controllers/school_admin")

var user_find = require("../middlewares/find_user")

/* GET signup page. */
router.get('/',function(req, res, next) {
  res.render('admin/index', { title: 'Admin - Proschool' });
})

router.get("/user/new", function(req, res){
  res.render("admin/user/new")
})

router.route('/user') 
  .get(AdminCtrl.allUser)
  .post(AdminCtrl.addUser)

router.get("/school/new", function(req, res){
  res.render("admin/school/new_school")
})

router.route("/school")
  .get(SchoolCtrl.allSchool)
  .post(SchoolCtrl.addSchool)

router.route("/:typeuser")
  .get(user_find, AdminCtrl.renderSingleTypeuser)

module.exports = router;