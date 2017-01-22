var mongoose = require("mongoose")
var Schema = mongoose.Schema

var nota_schema = new Schema({
    student: {
        name: String,
        lastname: String,
        username: {type: String , required: true, unique:true},
        task: {
                periodo: String,
                description: String,
                nota: Number,
            }
    },
    profesor: { type: Schema.Types.ObjectId, ref: "User" }
})

var Nota = mongoose.model("Nota", nota_schema)

module.exports = Nota