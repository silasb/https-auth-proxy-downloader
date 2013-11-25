var https = require('https')
  , request = require('request')
  , auth = require('simple-auth');

var start = function(options) {
  https.createServer(options.https, function(req, res) {
    auth(options.username, options.password)(req, res, function() {
      var url = req.url.split('/');
      url.shift();

      request('http://' + url.join('/')).pipe(res);
    })
  }).listen(options.port);
}

exports.start = start;
