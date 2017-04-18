'use strict';
var dataProvider = require('../../data/drivers/{driverId}.js');
/**
 * Operations on /drivers/{driverId}
 */
module.exports = {
  /**
   * summary:Get a driver
   * description: Goes to the DB, and retrieves the requested driver
   * parameters:driverId: the ID of the driver as set by the FrontEnd/Client
   * produces: A Driver object as specified in the conf/swagger.yaml  ('#/definitions/Driver') file
   * responses: 200 (with the Driver object), 404 (no driver with given Id was found)
   */
  get: function GetDriver(req, res, next) {
    dataProvider.get(req.params.driverId).then(function (driver) {
      if (driver) {
        res.send(200, driver);
      } else {
        res.send(404, 'The driver does not exist. ' + req.params.driverId);
      }
      next();
    }).done();
  }
};
