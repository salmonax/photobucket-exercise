const db = (process.env.MONGOLAB_URL || 'mongodb://localhost/photobucket');
monsgoose.Promise = Promise;
mongoose.connect(db);
