const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: { 
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: String,
  salt: String,
});

// Rehash the password if the passowrd has changed
// Warning: YAGNI
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.hashPassword(this.password);
  }
  return next();
});

// Use pbkdf2 for hash; maybe a bit faster than bcrypt
const hashify = (password, salt) =>
  crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');

userSchema.methods.hashPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = hashify(password, this.salt);
};

userSchema.methods.validPassword = function (password) {
  return this.password === hashify(password, this.salt);
};

module.exports = mongoose.model('User', userSchema);