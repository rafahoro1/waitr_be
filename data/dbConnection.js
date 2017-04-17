'use strict';
let mongoose = require('mongoose');
let Q = require('q');
mongoose.Promise = Q.Promise;
let options = {promiseLibrary: Q};
let dbURI = 'mongodb://127.0.0.1:27017/WaitrTestingDB2';
mongoose.connect(dbURI, options);


mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  //console.log('Mongoose default connection disconnected');
});

module.exports={
  mongoose:mongoose
};
