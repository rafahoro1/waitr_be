'use strict';
var dataProvider = require('../../../../data/drivers/{driverId}deliveries/{deliveryId}/review.js');
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
     */
  post: function CreateDeliveryReview(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
    var status = 200;
    var provider = dataProvider['post']['200'];
    provider(req, res, function (err, data) {
      if (err) {
        next(err);
        return;
      }
      res.send(status, data && data.responses);
      next();
    });
  }
};
