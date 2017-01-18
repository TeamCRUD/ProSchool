var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://jairperezs:D1e560*9c@ds157078.mlab.com:57078/proschool')

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email valido"]
var password_validation = {
    validator: function(p){
        return this.password_confirmation == p
    },
    message: "Las contraseña no son iguales"
}
var user_schema = new Schema({
    name: String,
    lastname: String,
    email: {type: String, required: "El correo es obligatorio", match: email_match},
    username: {type: String , required: true, unique:true, maxlength: [50, "Nombre de usuario muy grande"]},
    password: {type: String, minlength: [8, "La contraseña es muy corta"], validate: password_validation}
})

user_schema.virtual('password_confirmation').get(function(){
    return this.p_c
}).set(function(password){
    this.p_c
})

var User = mongoose.model('User' , user_schema);

module.exports = User