var User = require('../models/users');

exports.renderSingleTypeuser = function(req, res, next) {
  res.render('school/'+req.params.typeuser, { title: req.params.typeuser+'s'});
}