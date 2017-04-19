'use strict';
/**
 * Created by rafa on Apr/14/17.
 */
var swaggerMongoose = require('swagger-mongoose');
var Q = require('q');
var fs = require('fs');
var _= require('underscore');


var swagger = fs.readFileSync('./config/swagger.json');
let swaggerCompiled = swaggerMongoose.compile(swagger);
var Driver = swaggerCompiled.models.Driver;
var Location = swaggerCompiled.models.Location;


var mongoose = require('mongoose');
mongoose.Promise = Q.Promise;
var options = {promiseLibrary: Q};
let dbURI = 'mongodb://127.0.0.1:27017/WaitrTestingDB';
var db = mongoose.connect(dbURI, options);

mongoose.connection.on('connected', function () {
  mongoose.connection.dropDatabase()
    .then(function () {
      return fillTableLocations();
    })
    .then(function () {
      return fillTableDrivers();
    })
    .then(function () {
      mongoose.disconnect();
    })
    .catch(function (error) {
      console.error(error);
    })
    .done();
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  //console.log('Mongoose default connection disconnected');
});

var locations = [
  {'latitude': 1.1, 'longitude': 1.2},
  {'latitude': 2.1, 'longitude': 2.2},
  {'latitude': 3.1, 'longitude': 3.2},
];

let drivers = [
  {'id': 'dr_1', 'name': 'name1'},
  {'id': 'dr_2', 'name': 'name2'},
  {'id': 'dr_3', 'name': 'name3'},
  {'id': 'dr_4', 'name': 'name4'},
  {'id': 'dr_5', 'name': 'name5'},
  {'id': 'dr_6', 'name': 'name6'}
];


function fillTableLocations() {
  let saveLocs = [];
  locations.forEach((loc)=> {
    let item = new Location(loc);
    loc._id = item._id; // this will be used as reference in the Driver object
    saveLocs.push(item.save());
  });
  return Q.all(saveLocs);
}


function fillTableDrivers() {
  return  Location.find().then(function (locations) {
    let saveDrvs = [];
    drivers.forEach((drv)=> {
      let loc= locations[_.random(0, _.size(locations))];
      drv.current_location= loc._id;
      //console.log('locations ' + JSON.stringify(locations[0]));
      //drv.current_location = locations[0]._id;
      console.log('saving ' + JSON.stringify(drv));
      let item = new Driver(drv);
      console.log('item ' + JSON.stringify(item));
      saveDrvs.push(item.save());
    });
    return Q.all(saveDrvs);
  });
}

