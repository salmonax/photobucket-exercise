var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();
require('./config/db');
require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncommpp.jent after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);

// image routes and dependencies; refactor
var jwt = require('jwt-simple');
var secret = process.env.JWT_SECRET || 'super duper secret';
var User = require('./models/user');

app.get('/images', function (req, res, next) {
  let userData;
  try {
    userData = jwt.decode(req.headers.authorization, secret);
    // actually check database for expired token
  } catch (err) {
    res.status(400).json( { message: 'Authorization failed.' });
    return;
  }
  console.log(userData);
});

app.post('/images', function (req, res, next) {
  let userData;
  try {
    userData = jwt.decode(req.headers.authorization, secret);
    // actually check db for expired token here
  } catch (err) {
    res.status(400).json({ message: 'Authorization failed.' });
    return;
  }
  console.log(userData);

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
