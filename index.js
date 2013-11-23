var fs = require('fs')
  , https = require('https')
  , request = require('request')
  , auth = require('simple-auth');

var options = {
  https: {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
  },
  port: 8001,
  username: 'silasb',
  password: '1337'
};

https.createServer(options.https, function(req, res) {
  auth(options.username, options.password)(req, res, function() {
    var url = req.url.split('/');
    url.shift();

    request('http://' + url.join('/')).pipe(res);
  })
}).listen(options.port);
