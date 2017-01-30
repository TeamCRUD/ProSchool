var mongoose = require("mongoose")
var Schema = mongoose.Schema

var nota_schema = new Schema({
    period:{type: String, require: true},
    task:{type: String, require: true},
    grade: {type: String, require: true},
    teacher: {
        fullname: {type: String, require: true},
        username: {type: String, require: true}
    },
    profesor:{type: Schema.Types.ObjectId, ref:'User'}
})

var Nota = mongoose.model("Nota", nota_schema)

module.exports = Nota