var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://jairperezs:D1e560*9c@ds157078.mlab.com:57078/proschool')
mongoose.Promise = global.Promise;

var userSchemaJSON = {
    name: String,
    lastname: String,
    email: String,
    username: String,
    password: String
}

var user_schema = new Schema(userSchemaJSON)

module.exports = mongoose.model('User' , user_schema);