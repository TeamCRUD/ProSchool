var mongoose = require("mongoose")
var Schema = mongoose.Schema

var nota_schema = new Schema({
    periodo: { type: String, require: true },
    nota: Number
})

var Nota = mongoose.model("Nota", nota_schema)

module.exports = Nota