var mongoose = require("mongoose")
var Schema = mongoose.Schema

var school_schema = new Schema({
    school:{type: String, require: true},
    username:{type: String, require: true},
    password:{type: String, require: true},
    grade:{type: String, require: true},
    student:{type: String, require: true},
    teacher:{
        name: {type: String, require: true},
        lastname: {type: String, require: true},
        username: {type: String, require: true}
    }
})

var School = mongoose.model("school", school_schema)

module.exports = School