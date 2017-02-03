var mongoose = require("mongoose")
var Schema = mongoose.Schema

var task_schema = new Schema({
    period:{type: String, require: true},
    task:{type: String, require: true},
    grade: {type: String, require: true},
    note: {type: Number, require: true},
    student: {type: String, require: true},
    teacher: {
        fullname: {type: String, require: true},
        username: {type: String, require: true}
    },
    profesor:{type: Schema.Types.ObjectId, ref:'User'}
})

var Task = mongoose.model("Task", task_schema)

module.exports = Task