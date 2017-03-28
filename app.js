var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var cookieSession = require('cookie-session');
var session = require('express-session')
var methodOverride = require("method-override")

var session_middleware = require('./middlewares/session')

var index = require('./routes/index');
var user = require('./routes/user');
var signup = require('./routes/signup');
var sessions = require('./routes/sessions');
var logout = require('./routes/logout');
var home = require('./routes/home');
var list = require('./routes/list');
var task = require('./routes/task');
var note = require('./routes/note');
var school = require("./routes/school")
var admin = require("./routes/admin")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride("_method"))

app.use(session({
  secret: 'P*s*1*7',
  resave: false,
  saveUninitialized: false

}))

app.use('/', index);
app.use('/signup', signup);
app.use('/sessions', sessions);
app.use('/logout', logout);
app.use('/*', session_middleware)
app.use('/home', home);
app.use('/list', list);
app.use('/user', user);
app.use('/task', task);
app.use('/note', note);
app.use("/school", school)
app.use("/admin", admin)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;