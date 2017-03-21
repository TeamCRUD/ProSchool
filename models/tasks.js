var mongoose = require("mongoose")
var Schema = mongoose.Schema

var task_schema = new Schema({
    period:{type: String, required: true},
    task:{type: String, required: true},
    grade: {type: String, required: true},
    porcentage: {type: Number, required: true},
    matter: {type: String, required: true},
    teacher: {
        fullname: {type: String, required: true},
        username: {type: String, required: true}
    },
    profesor:{type: Schema.Types.ObjectId, ref:'User'},
    student: String,
    note: Number,
})

var Task = mongoose.model("Task", task_schema)

module.exports = Task