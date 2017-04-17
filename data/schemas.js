'use strict';
var mongoose = require('./dbConnection.js').mongoose;
var Schema = mongoose.Schema;

var driverSchema = mongoose.Schema({
  id: String,
  name: String,
  current_location_id:{ type: Schema.Types.ObjectId, index: true }
});

var locationSchema = mongoose.Schema({
  latitude: Number,
  longitude:Number
});

var driverReviewSchema = mongoose.Schema({
  driver_id: Schema.Types.ObjectId,
  review_id: Schema.Types.ObjectId
});

var reviewSchema = mongoose.Schema({
  rating: { type: Number, min: 1, max: 5 },
  description: String
});


var Driver = mongoose.model('Driver', driverSchema);
var Location = mongoose.model('Location', locationSchema);
var Review = mongoose.model('Review', reviewSchema);
var DriverReview = mongoose.model('DriverReview', driverReviewSchema);

module.exports= {
  Driver:Driver,
  Location:Location,
  Review:Review,
  DriverReview:DriverReview,
  mongoose:mongoose
};
