var mongoose = require("mongoose")
var Schema = mongoose.Schema

var nota_schema = new Schema({
    periodo: { type: String, require: true },
    nota: Number,
    profesor: { type: Schema.Types.ObjectId, ref: "User" }
})

var Nota = mongoose.model("Nota", nota_schema)

module.exports = Nota