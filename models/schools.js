var mongoose = require("mongoose")
var Schema = mongoose.Schema

var school_schema = new Schema({
    school: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    typeuser: {type: String, required: true}
})

var School = mongoose.model("school", school_schema)

module.exports = School