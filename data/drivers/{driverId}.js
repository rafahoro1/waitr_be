'use strict';
'use strict';
var Q = require('q');
var _ = require('underscore');
var schemas = require('../../data/schemas.js');

var Driver = schemas.Driver;
var Location = schemas.Location;

/**
 * Operations on /drivers/{driverId}
 */
module.exports = {
  /**
   * summary:
   * description:
   * parameters: driverId: driver.id (not driver._id)
   * produces:
   * operationId: GetDriver
   */
  get: function (driverId) {
    return Driver.findOne({id: driverId}).then(function (driver) {
      if (!driver) {
        return driver;
      }
      return Location.findOne({_id: driver.current_location_id})
        .then(function (loc) {
          return {
            id: driver.id,
            name: driver.name,
            current_location: {
              latitude: loc.latitude,
              longitude: loc.longitude
            }
          }
        })
    });
  }
};
