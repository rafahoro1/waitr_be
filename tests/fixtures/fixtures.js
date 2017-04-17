'use strict';
var Q = require('q');
var schemas = require('../../data/schemas.js');

var Driver = schemas.Driver;
var Location = schemas.Location;
var Review = schemas.Review;
var DriverReview = schemas.DriverReview;

var mongoose = schemas.mongoose;

var locations = [
  {'latitude': 1.1, 'longitude': 1.2},
  {'latitude': 2.1, 'longitude': 2.2},
  {'latitude': 3.1, 'longitude': 3.2}
];

var drivers = [
  {'id': 'dr_1', 'name': 'name1'},
  {'id': 'dr_2', 'name': 'name2'},
  {'id': 'dr_3', 'name': 'name3'},
  {'id': 'dr_4', 'name': 'name4'},
  {'id': 'dr_5', 'name': 'name5'},
  {'id': 'dr_6', 'name': 'name6'}
];

var reviews = [
  {rating: 1, description: 'description 1'},
  {rating: 2, description: 'description 2'},
  {rating: 3, description: 'description 3'},
  {rating: 4, description: 'description 4'},
  {rating: 5, description: 'description 5'},
  {rating: 1, description: 'description 6'},
  {rating: 1, description: 'description 7'},
  {rating: 2, description: 'description 8'},
  {rating: 3, description: 'description 9'},
  {rating: 1, description: 'description 10'},
  {rating: 2, description: 'description 11'},
  {rating: 4, description: 'description 12'}
];

mongoose.connection.on('connected', function () {
  mongoose.connection.dropDatabase()
    .then(function () {
      return fillTableLocations();
    })
    .then(function () {
      return fillTableDrivers();
    })
    .then(function () {
      return fillTableReviews();
    })
    .then(function () {
      return fillTableDriverReview();
    })
    .then(function () {
      mongoose.disconnect();
    })
    .catch(function (error) {
      console.error(error);
    })
    .done();
});

function fillTableLocations() {
  let saveItems = [];
  locations.forEach((data)=> {
    let item = new Location(data);
    saveItems.push(item.save());
  });
  return Q.all(saveItems);
}


function fillTableDrivers() {
  return Location.find().then(function (locations) {
    let saveItems = [];
    drivers.forEach((drv)=> {
      let loc = locations[Math.floor(Math.random() * locations.length)];
      drv.current_location_id = loc._id;
      console.log('saving ' + JSON.stringify(drv));
      let item = new Driver(drv);
      console.log('item ' + JSON.stringify(item));
      saveItems.push(item.save());
    });
    return Q.all(saveItems);
  });
}

function fillTableReviews() {
  let saveItems = [];
  reviews.forEach((data)=> {
    let item = new Review(data);
    saveItems.push(item.save());
  });
  return Q.all(saveItems);
}

function fillTableDriverReview() {
  return Q.spread([Driver.find(), Review.find()], function (drivers, reviews) {
    let saveItems = [];
    reviews.forEach((rev) => {
      let drv = drivers[Math.floor(Math.random() * drivers.length)];
      let item = new DriverReview({driver_id: drv._id, review_id: rev._id});
      saveItems.push(item.save());
    });
    return Q.all(saveItems);
  });
}

