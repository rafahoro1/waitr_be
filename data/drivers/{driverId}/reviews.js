'use strict';
var schemas = require('../../../data/schemas.js');
var _ = require('underscore');
var Q = require('q');

var Driver = schemas.Driver;
var Review = schemas.Review;
var DriverReview = schemas.DriverReview;
var DeliveryReview = schemas.DeliveryReview;

/**
 * Operations on /drivers/{driverId}/reviews
 */
module.exports = {
  /**
   * summary: GetDriverReviews
   * description: Get all reviews for a givern driver
   * parameters:driverId: the ID of the driver as set by the FrontEnd/Client
   * produces: A DriverReviewList object as specified in the conf/swagger.yaml  ('#/definitions/DriverReviewList') file
   * responses: -1 if no such driver. A list of Reviews otherwise
   * operationId: GetDriverReviews
   */
  get: function (driverId) {
    // first all get the Driver from the driver.id
    return Driver.findOne({id: driverId}).then(function (driver) {
      if (!driver) {
        return -1;
      }
      return Q.spread([
        DriverReview.find({driver_id: driver._id}, 'review_id'),
        DeliveryReview.find({driver_id: driver._id}, 'review_id')
      ], function (driverReviews, deliveryReviews) {
        let reviewsId = _.pluck(_.union(driverReviews, deliveryReviews), 'review_id');
        return Review.find({_id: {$in: reviewsId}}).then(function (res) {
          return res;
        });
      });
    });
  }
};
