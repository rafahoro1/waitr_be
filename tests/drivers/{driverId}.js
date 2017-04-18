'use strict';
var Test = require('tape');
var Restify = require('restify');
var Swaggerize = require('swaggerize-restify');
var Path = require('path');
var Request = require('supertest');
var Parser = require('swagger-parser');
var mongoose= require('../../data/dbConnection.js').mongoose;

/**
 * Test for /drivers/{driverId}
 */
Test('/drivers/{driverId}', function (t) {
  var apiPath = Path.resolve(__dirname, '../../config/swagger.yaml');
  var server = Restify.createServer();
  server.use(Restify.bodyParser());
  server.use(Restify.queryParser());
  Swaggerize(server, {
    api: apiPath,
    handlers: Path.resolve(__dirname, '../../handlers')
  });
  Parser.validate(apiPath, function (err, api) {
    t.error(err, 'No parse error');
    t.ok(api, 'Valid swagger api');
    /**
     * summary:
     * description:
     * parameters:
     * produces:
     * responses: 200, 404
     */
    t.test('test GetDriver get operation', function (t) {
      var request = Request(server)
      .get('/drivers/dr_3')
      .end(function (err, res) {
        t.error(err, 'No error');
        t.equals(200, res.statusCode, 'response status');
        var Validator = require('is-my-json-valid');
        var validate = Validator(api.paths['/drivers/{driverId}']['get']['responses']['200']['schema']);
        var response = res.body;
        t.ok(validate(response), 'Valid response:');
        t.error(validate.errors, 'No validation errors');
        t.same({
          "id": "dr_3",
          "name": "name3",
          "current_location": {"latitude": 3.1, "longitude": 3.2}
        }, response, 'Returned driver');
        t.end();
      });
    });

    t.test('test GetDriver get driver without location operation', function (t) {
      var request = Request(server)
        .get('/drivers/dr_nr')
        .end(function (err, res) {
          t.error(err, 'No error');
          t.equals(200, res.statusCode, 'response status');
          var Validator = require('is-my-json-valid');
          var validate = Validator(api.paths['/drivers/{driverId}']['get']['responses']['200']['schema']);
          var response = res.body;
          t.ok(validate(response), 'Valid response:');
          t.error(validate.errors, 'No validation errors');
          t.same({
            "id": 'dr_nr',
            "name": 'no review/location driver',
            "current_location": {}
          }, response, 'Returned driver');
          t.end();
        });
    });

    t.test('test GetDriver get unexisting driver operation', function (t) {
      var request = Request(server)
        .get('/drivers/dr_unexisting')
        .end(function (err, res) {
          t.error(err, 'No error');
          t.equals(404, res.statusCode, 'response status');
          var response = res.body;
          t.same( 'The driver does not exist. dr_unexisting', response, 'Returned driver');
          t.end();
        });
    });
    t.test('closing mongo connection', function(t){
      mongoose.disconnect();
      t.end();
    });
  });
});
