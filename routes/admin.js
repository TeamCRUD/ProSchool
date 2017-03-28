var express = require('express');
var router = express.Router();

var AdminCtrl = require("../controllers/admin")

var user_find = require("../middlewares/find_user")

/* GET signup page. */
router.get("/user/new", function(req, res){
  res.render("admin/user/new")
})

router.get("/school/new", function(req, res){
  res.render("admin/school/new_school")
})

router.route('/user') 
  .get(AdminCtrl.allUser)
  .post(AdminCtrl.addUser)

router.route("/school")
  .get(AdminCtrl.allSchool)
  .post(AdminCtrl.addSchool)

module.exports = router;