var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.dbPath);
var db = mongoose.connection;

db.on('error', function (err) {
	console.log('error occured from db:', err);
});

db.once('open', function dbOpen() {
	console.log('successfully opened the db');
});

exports.mongoose = mongoose;