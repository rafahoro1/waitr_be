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
 The driver_id in this Schema is not a good idea: it might be inconsistent/have invalid data as no validation is done against it.
 In a real app, makes more sense to have a schema DriverDelivery that links a driver to a delivery, and then remove driver_id from this schema.
 However as there is no resource/handler to create a DriverDelivery entry (and makes no sense to create such link only when a DeliveryReview entry is created)
 I decided to add it in this table, as a simple implementation that meets the required yaml file
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
