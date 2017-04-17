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
   * summary: Get a driver
   * description:  Get a driver. It merges objects from different collections ('drivers' and 'locations') to create a
   * consolidated object. It may make more sense to get a parameter to know if such (time/resources costly) action
   * is necessary for the caller, and if not, just return the current_location_id, instead of the object. However, for
   * code simplicity, I just fill the data.
   * parameters: driverId: driver.id (not driver._id). The id of the driver (as set by the FrontEnd/Client, not by the DB)
   * produces: A Driver object as specified in the conf/swagger.yaml  ('#/definitions/Driver') file
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
