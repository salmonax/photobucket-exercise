const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

const authCheck = (email, password, done) => {
  User.findOne({ email }).then((err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, {
        message: 'Incorrect username.',
      });
    }
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Incorrect password.',
      });
    }
    return done(null, user);
  });
}

passport.use(new LocalStrategy({ usernameField: 'email' }, authCheck);