var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = { 
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } 
}; 

mongoose.Promise = global.Promise

var mongodbUri = 'mongodb://jairperezs:D1e560*9c@ds135519.mlab.com:35519/proschool'
mongoose.connect(mongodbUri, options)

var conn = mongoose.connection;  

conn.on('error', console.error.bind(console, 'connection error:'));  
conn.once('open', function() {
    console.log('Conectado a DB')
});

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email valido"]
var password_validation = {
    validator: function(p){
        return this.password_confirmation == p
    },
    message: "Las contraseña no son iguales"
}
var user_schema = new Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    typeuser: {type: String, required: true},
    school: String,
    grade: String,
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