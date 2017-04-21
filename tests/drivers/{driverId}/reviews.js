'use strict';
var Test = require('tape');
var Restify = require('restify');
var Swaggerize = require('swaggerize-restify');
var Path = require('path');
var Request = require('supertest');
var Parser = require('swagger-parser');
var mongoose = require('../../../data/dbConnection.js').mongoose;

/**
 * Test for /drivers/{driverId}/reviews
 */
Test('/drivers/{driverId}/reviews', function (t) {
  var apiPath = Path.resolve(__dirname, '../../../config/swagger.yaml');
  var server = Restify.createServer();
  server.use(Restify.bodyParser());
  server.use(Restify.queryParser());
  Swaggerize(server, {
    api: apiPath,
    handlers: Path.resolve(__dirname, '../../../handlers')
  });
  Parser.validate(apiPath, function (err, api) {
    t.error(err, 'No parse error');
    t.ok(api, 'Valid swagger api');

    t.test('test GetDriverReviews get operation', function (t) {
      Request(server)
        .get('/drivers/dr_3/reviews')
        .end(function (err, res) {
          t.error(err, 'No error');
          t.equals(200, res.statusCode, 'response status');
          var Validator = require('is-my-json-valid');
          var validate = Validator(api.paths['/drivers/{driverId}/reviews']['get']['responses']['200']['schema']);
          var response = res.body;
          t.ok(validate(response), 'Valid response:');
          t.error(validate.errors, 'No validation errors');
          //t.same(response.length, 2, 'response length');
          //console.log('Response= ' + JSON.stringify(response));
          t.same(response[0].description, 'description 6', 'response 1 description');
          t.same(response[0].rating, 1, 'response 1 rating');
          t.same(response[1].description, 'description 11', 'response 2 description');
          t.same(response[1].rating, 2, 'response 2 rating');
          t.end();
        });
    });

    t.test('test GetDriverReviews get unexisting driver operation', function (t) {
      Request(server)
        .get('/drivers/dr_unexisting/reviews')
        .end(function (err, res) {
          t.error(err, 'No error');
          t.equals(404, res.statusCode, 'response status');
          var response = res.body;
          t.same('The driver does not exist. dr_unexisting', response, 'Returned reviews');
          t.end();
        });
    });

    t.test('test GetDriverReviews get driver without reviews operation', function (t) {
      Request(server)
        .get('/drivers/dr_nr/reviews')
        .end(function (err, res) {
          t.error(err, 'No error');
          t.equals(200, res.statusCode, 'response status');
          var Validator = require('is-my-json-valid');
          var validate = Validator(api.paths['/drivers/{driverId}/reviews']['get']['responses']['200']['schema']);
          var response = res.body;
          t.ok(validate(response), 'Valid response:');
          t.error(validate.errors, 'No validation errors');
          t.same(response.length, 0, 'response length');
          t.end();
        });
    });
  });
});


Test.onFinish(function(){
  mongoose.disconnect();
});
