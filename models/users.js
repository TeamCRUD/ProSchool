var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://jairperezs:d1e560@ds131119.mlab.com:31119/proschool')

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email valido"]
var password_validation = {
    validator: function(p){
        return this.password_confirmation == p
    },
    message: "Las contraseña no son iguales"
}
var user_schema = new Schema({
    name: {type: String, required: true},
    lastname:{type: String, required: true},
    email: {type: String, required: true},
    typeuser: {type: String, required: true},
    username: {type: String , required: true},
    password: {type: String, required: true},
})

user_schema.virtual('password_confirmation').get(function(){
    return this.p_c
}).set(function(password){
    this.p_c
})

var User = mongoose.model('User' , user_schema);

module.exports = User