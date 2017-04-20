'use strict';

var Restify = require('restify');
var Swaggerize = require('swaggerize-restify');
var Path = require('path');

var Server = Restify.createServer();

Server.use(Restify.bodyParser());
Server.use(Restify.queryParser());

// Note, for simplicity adding '*' to CORS. However for security you should put an IP here
Server.use(Restify.CORS({'origins': ['*','http://localhost:9000', 'http://54.201.33.238:9000/']}));
// This is a good example of a CORS setting:
//Server.use(Restify.CORS({'origins': ['http://54.201.33.238']}));

Server.get('/api', function (req, res) {
  res.send(200);
});

Swaggerize(Server, {
  api: Path.resolve('./config/swagger.yaml'),
  handlers: Path.resolve('./handlers')
});

Server.listen(8000, function () {
  Server.swagger.api.host = Server.address().address + ':' + Server.address().port;
    /* eslint-disable no-console */
  console.log('App running on %s:%d', Server.address().address, Server.address().port);
    /* eslint-disable no-console */
});
