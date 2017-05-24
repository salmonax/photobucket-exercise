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

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads/users')));

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);

// image routes and dependencies; refactor
var jwt = require('jwt-simple');
var secret = process.env.JWT_SECRET || 'super duper secret';
var User = require('./models/user');
var multer = require('multer');
var upload = multer({ dest: './uploads/temp/'}).any();
var fs = require('fs');
var path = require('path');
var shorthash = require('shorthash').unique;

app.get('/images', function (req, res, next) {
  let userData;
  try {
    userData = jwt.decode(req.headers.authorization, secret);
    // actually check database for expired token
  } catch (err) {
    res.status(400).json( { message: 'Authorization failed.' });
    return;
  }
  // TO DO: heck potentially expired token against the database here
  const userHash = shorthash(userData.email);
  const imagePath = path.resolve('./uploads/users/', userHash);
  const imageRoute = path.resolve('/uploads/', userHash);

  fs.readdir(imagePath, (err, items) => {
    let output = (!items) ? [] : items.map(filename => {
      return {
        caption: "Caption Placeholder",
        url: path.resolve(imageRoute, filename),
        user: userData.username
      };
    });
    res.json(output);

  });



});

app.post('/images', upload, function (req, res, next) {
  let userData;
  console.log(req.files[0], req.body);
  try {
    userData = jwt.decode(req.headers.authorization, secret);
  } catch (err) {
    res.status(400).json({ message: 'Authorization failed.' });
    return;
  }
  let file = req.files[0];

  let tempPath = file.path;
  let targetDir = path.resolve('./uploads/users/', shorthash(userData.email));
  let targetPath = path.resolve(targetDir, file.originalname);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }
  fs.rename(tempPath, targetPath, (err) => {
    if (err) throw err;
    res.json({message: "Upload successful!"});
  });

  // TO DO: check potentially expired token against the database here
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
