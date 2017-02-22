var express = require('express');
var router = express.Router();

var AdminCtrl = require("../controllers/school_admin")

/* GET signup page. */
router.get('/',function(req, res, next) {
  res.render('admin/index', { title: 'Admin - Proschool' });
})

router.route('/user') 
  .get(AdminCtrl.renderSingupUser)
  .post(AdminCtrl.addUser)

module.exports = router;