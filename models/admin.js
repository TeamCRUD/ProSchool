var mongoose = require("mongoose")
var Schema = mongoose.Schema

var admin_schema = new Schema({
    username:{type: String, require: true},
    password:{type: String, require: true},
    typeuser:{type: String, require: true}
})

var Admin = mongoose.model("admin", admin_schema)

module.exports = Admin