'use strict';
var dataProvider = require('../../../data/drivers/{driverId}/reviews.js');
/**
 * Operations on /drivers/{driverId}/reviews
 */
module.exports = {
  /**
   * summary:
   * description:
   * parameters:
   * produces:
   * responses: 200, 404
   */
  get: function GetDriverReviews(req, res, next) {
    dataProvider.get(req.params.driverId).then(function (reviews) {
      if (-1 != reviews ) {
        res.send(200, reviews);
      } else {
        res.send(404, 'The driver does not exist. ' + req.params.driverId);
      }
      next();
    }).done();
  }
};
