'use strict';
var mongoose = require('./dbConnection.js').mongoose;
var Schema = mongoose.Schema;

var driverSchema = mongoose.Schema({
  id: String,
  name: String,
  current_location_id: {type: Schema.Types.ObjectId, index: true}
});

var locationSchema = mongoose.Schema({
  latitude: Number,
  longitude: Number
});

var reviewSchema = mongoose.Schema({
  rating: {type: Number, min: 1, max: 5},
  description: String
});

var driverReviewSchema = mongoose.Schema({
  driver_id: Schema.Types.ObjectId,
  review_id: Schema.Types.ObjectId
});

/*
 The driver_id in this Schema is not really used
 Moreover: it might be inconsistent/have invalid data as no validation is done against it.
 It's here only because we got the info in the CreateDeliveryReview method and may be usefull for future methods (Altough
 probably makes more sense to define another schema DriverDelivery that binds a Driver with a Delivery).
 */
var deliveryReviewSchema = mongoose.Schema({
  driver_id: Schema.Types.ObjectId,
  deliveryId: String, // the delivery collection (although defined in Swagger) is not used, so just storing the String
  review_id: Schema.Types.ObjectId
});


var Driver = mongoose.model('Driver', driverSchema);
var Location = mongoose.model('Location', locationSchema);
var Review = mongoose.model('Review', reviewSchema);
var DriverReview = mongoose.model('DriverReview', driverReviewSchema);
var DeliveryReview = mongoose.model('DeliveryReview', deliveryReviewSchema);

module.exports = {
  Driver: Driver,
  Location: Location,
  Review: Review,
  DriverReview: DriverReview,
  DeliveryReview: DeliveryReview,
  mongoose: mongoose
};
