'use strict';
var dataProvider = require('../../../../../data/drivers/{driverId}/deliveries/{deliveryId}/review.js');
/**
 * Operations on /drivers/{driverId}deliveries/{deliveryId}/review
 */
module.exports = {
  post: function CreateDeliveryReview(req, res, next) {
    let driverId = req.params.driverId;
    let deliveryId = req.params.deliveryId;
    let review = {
      rating: req.params.rating,
      description: req.params.description
    };
    dataProvider.post(driverId, deliveryId, review).then(function (reviews) {
      if (-1 != reviews) {
        res.send(200, reviews);
      } else {
        res.send(404, 'The driver does not exist. ' + req.params.driverId);
      }
      next();
    }).done();
  }
};
