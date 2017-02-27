var express = require('express');
var router = express.Router();

var AdminCtrl = require("../controllers/user_admin")
var SchoolCtrl = require("../controllers/school_admin")

var user_find = require("../middlewares/find_user")

/* GET signup page. */
router.get('/',function(req, res, next) {
  res.render('admin/index', { title: 'Admin - Proschool' });
})

router.route('/user') 
  .get(AdminCtrl.renderSingupUser)
  .post(AdminCtrl.addUser)

router.route("/school")
  .get(SchoolCtrl.renderSingupSchool)
  .post(SchoolCtrl.addSchool)

router.route("/:typeuser")
  .get(user_find, AdminCtrl.renderSingleTypeuser)

module.exports = router;