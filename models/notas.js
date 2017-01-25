var mongoose = require("mongoose")
var Schema = mongoose.Schema

var nota_schema = new Schema({
    period:{type: String, require: true},
    task:{type: String, require: true},
    note:{type: Number, require: true},
    student:{type: String, require: true},
    teacher:{type: String, require: true},
    profesor:{type: Schema.Types.ObjectId, ref:'User'}
})

var Nota = mongoose.model("Nota", nota_schema)

module.exports = Nota