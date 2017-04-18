'use strict';
var Test = require('tape');
var Restify = require('restify');
var Swaggerize = require('swaggerize-restify');
var Path = require('path');
var Request = require('supertest');
var Parser = require('swagger-parser');
var mongoose = require('../../../../../data/dbConnection.js').mongoose;


/**
 * Test for /drivers/{driverId}deliveries/{deliveryId}/review
 */
Test('/drivers/{driverId}deliveries/{deliveryId}/review', function (t) {
  var apiPath = Path.resolve(__dirname, '../../../../../config/swagger.yaml');
  var server = Restify.createServer();
  server.use(Restify.bodyParser());
  server.use(Restify.queryParser());
  Swaggerize(server, {
    api: apiPath,
    handlers: Path.resolve(__dirname, '../../../../../handlers')
  });
  Parser.validate(apiPath, function (err, api) {
    t.error(err, 'No parse error');
    t.ok(api, 'Valid swagger api');


    t.test('test CreateDeliveryReview post operation', function (t) {
      const RATING = 3;
      const DESCRIPTION = 'desc for delivery';
      Request(server)
        .post('/drivers/dr_3/deliveries/del1/review')
        .send({rating: RATING, description: DESCRIPTION})
        .end(function (err, res) {
          t.error(err, 'No error');
          t.equals(200, res.statusCode, 'response status');
          var Validator = require('is-my-json-valid');
          var validate = Validator(api.paths['/drivers/{driverId}/deliveries/{deliveryId}/review']['post']['responses']['200']['schema']);
          var response = res.body;
          t.ok(validate(response), 'Valid response:');
          t.error(validate.errors, 'No validation errors');
          t.same(response.deliveryId, 'del1', 'response deliveryId');
          t.same(response.review.rating, RATING, 'response delivery.review.rating');
          t.same(response.review.description, DESCRIPTION, 'response delivery.review.description');
          t.end();
        });
    });

    t.test('test CreateDeliveryReview for unexisting driver - post operation', function (t) {
      Request(server)
        .post('/drivers/dr_unexisting/deliveries/del1/review')
        .send({rating: 3, description: 'desc for delivery'})
        .end(function (err, res) {
          t.error(err, 'No error');
          t.equals(404, res.statusCode, 'response status');
          var response = res.body;
          t.same('The driver does not exist. dr_unexisting', response, 'Returned delivery review');
          t.end();
        });
    });


    t.test('closing mongo connection', function (t) {
      mongoose.disconnect();
      t.end();
    });

  });
});
