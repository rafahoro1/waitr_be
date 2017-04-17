'use strict';
var Q = require('q');
var fs = require('fs');
var _= require('underscore');
var schemas= require('../../data/schemas.js');

var Driver = schemas.Driver;
var Location = schemas.Location;

var mongoose = schemas.mongoose;

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

var locations = [
  {'latitude': 1.1, 'longitude': 1.2},
  {'latitude': 2.1, 'longitude': 2.2},
  {'latitude': 3.1, 'longitude': 3.2}
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
    saveLocs.push(item.save());
  });
  return Q.all(saveLocs);
}


function fillTableDrivers() {
  return  Location.find().then(function (locations) {
    let saveDrvs = [];
    drivers.forEach((drv)=> {
      let loc= locations[Math.floor(Math.random()*locations.length)];
      drv.current_location_id= loc._id;
      console.log('saving ' + JSON.stringify(drv));
      let item = new Driver(drv);
      console.log('item ' + JSON.stringify(item));
      saveDrvs.push(item.save());
    });
    return Q.all(saveDrvs);
  });
}

