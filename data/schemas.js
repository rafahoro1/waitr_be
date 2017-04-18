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

var reviewSchema = mongoose.Schema({
  rating: { type: Number, min: 1, max: 5 },
  description: String
});

var driverReviewSchema = mongoose.Schema({
  driver_id: Schema.Types.ObjectId,
  review_id: Schema.Types.ObjectId
});

/*
 The driver_id in this Schema is not strictly necessary, as we can get it from the Review + Driver collections
 anyway Im adding it here to make lookup faster.
 There is however a cons: it might be inconsistent/have invalid data.
 That can be checked with a cron, that checks the collections are consistent on the background
*/
var deliveryReviewSchema = mongoose.Schema({
  driver_id: Schema.Types.ObjectId,
  deliveryId: String, // the delivery collection is not defined in Swagger, so just storing the givenId
  review_id: Schema.Types.ObjectId
});


var Driver = mongoose.model('Driver', driverSchema);
var Location = mongoose.model('Location', locationSchema);
var Review = mongoose.model('Review', reviewSchema);
var DriverReview = mongoose.model('DriverReview', driverReviewSchema);
var DeliveryReview = mongoose.model('DeliveryReview', deliveryReviewSchema);

module.exports= {
  Driver:Driver,
  Location:Location,
  Review:Review,
  DriverReview:DriverReview,
  DeliveryReview:DeliveryReview,
  mongoose:mongoose
};
