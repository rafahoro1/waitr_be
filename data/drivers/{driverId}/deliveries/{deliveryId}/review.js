'use strict';

var schemas = require('../../../../../data/schemas.js');
//var _= require('underscore');

var Driver = schemas.Driver;
var Review = schemas.Review;
var DeliveryReview = schemas.DeliveryReview;


/**
 * Operations on /drivers/{driverId}deliveries/{deliveryId}/review
 */
module.exports = {
  /**
   * summary:
   * description:
   * parameters:
   * produces:
   * responses: 200
   * operationId: CreateDeliveryReview
   */
  post: function (driverId, deliveryId, review) {
    // TODO: can we have more than 1 review for same driver/delivery pair? If not, check before inserting
    return Driver.findOne({id: driverId}).then(function (driver) {
      if (!driver) {
        return -1;
      }
      let rev = new Review(review);
      return rev.save().then(function (r) {
        let item = {
          driver_id: driver._id,
          deliveryId: deliveryId,
          review_id: r._id
        };
        let dr = new DeliveryReview(item);
        return dr.save().then(function(){
          return {
            deliveryId: deliveryId,
            review: rev
          };
        });
      });
    });
  }
};
