const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jwt-simple');

const msg = { 
 missingFields: "All fields required",
 alreadyExists: "User already exists",
 incorrectInfo: "Incorrect name or password",
};

const sendError = (res, message, status = 400) => {
  (message = message, status) => res.status(status).json({ message });
}
const makeToken = (user) => jwt.encode(user, process.env.JWT_SECRET || 'super duper secret');

module.exports = {
  register: (req, res, next) => {
    const sendError = sendError(res);
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      sendError(msg.missingFields);
      return;
    }
    User.findOne({ email })
      .then(user => {
        if (user) {
          sendError(msg.alreadyExists)
          return null;
        }
        return User.create({ email, username, password });
      })
      .then(user => {
        if (user) {
          res.json({ token: makeToken(user) });
        }
      })
      .catch(error => next(error));
  },
  login: (req, res, next) => {
    const { email, password } = req.body;
    const sendError = sendError(res, msg.incorrectInfo);
    if (!email || !password) { return sendError() }
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) { return sendError(); }
      res.json({ token: makeToken(user) });
    })(req, res);
  },
};
