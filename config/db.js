const mongoose = require('mongoose');

const db = (process.env.MONGOLAB_URL || 'mongodb://localhost/photobucket');
mongoose.Promise = Promise;
mongoose.connect(db);
