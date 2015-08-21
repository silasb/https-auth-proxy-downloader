var https = require('https')
  , http = require('http')
  , request = require('request')
  , auth = require('simple-auth');

var logRequest = function(req, res) {
  console.info(req.method + ' ' + req.url.substring(1, req.url.length) + ' from ' + req.connection.remoteAddress + ' returned ' + res.statusCode)
}

var start = function(options) {
  // function that handles regular requests
  var doRequest = function(req, res) {
    var url = req.url.split('/');
    url.shift();

    var r = request('http://' + url.join('/'))

    r.on('response', function(response) {
      r.pipe(res)

      logRequest(req, res)
    })

    r.on('error', function(err) {
      console.log(err)
      res.statusCode = 500
      res.end()

      logRequest(req, res)
    })
  };

  // function that handle authenticated requests
  var doAuth = function(req, res) {
    return auth(options.username, options.password, 1000)(req, res, function() {
      doRequest(req, res);
    })
  };

  // main server setup that configures either a HTTPS or HTTP server
  var server = function() {
    if (options.https) {
      return https.createServer(options.https, function(req, res) {

        if (options.username && options.password) {
          doAuth(req, res);
        } else {
          doRequest(req, res);
        }

      });
    } else {
      return http.createServer(function(req, res) {
        if (options.username && options.password) {
          doAuth(req, res);
        } else {
          doRequest(req, res);
        }
      });
    }
  };

  // start the server
  server().listen(options.port);
}

// what gets exported out of this library
exports.start = start;
