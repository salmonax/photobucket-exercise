const passport = require('passport');
const User = require('../models/user');
const jwt = require('jwt-simple');

const msg = { 
 missingFields: "All fields required.",
 alreadyExists: "User already exists.",
 incorrectInfo: "Incorrect name or password.",
};

const secret = process.env.JWT_SECRET || 'super duper secret';

const _sendError = (res, _message, status = 400) => {
  return (message = _message) => {
    res.status(status).json({ message })
  };
}
const makeToken = (user) => jwt.encode(user, secret);

module.exports = {
  decodeToken: (token) => jwt.decode(token, secret),
  register: (req, res, next) => {
    const sendError = _sendError(res);
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
          res.json({ token: makeToken(user), username: user.username });
        }
      })
      .catch(error => {
        next(error)
      });
  },
  login: (req, res, next) => {
    const { email, password } = req.body;
    const sendError = _sendError(res, msg.incorrectInfo);

    if (!email || !password) { return sendError() }
    passport.authenticate('local', function (err, user, info) {
      if (err || !user) { return sendError(); }
      res.json({ token: makeToken(user), username: user.username });
    })(req, res, next);
  },
};
