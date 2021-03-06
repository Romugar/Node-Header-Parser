// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// header parser

app.get("/api/whoami", function(req, res) {  
  var ipHeader = req.header('x-forwarded-for');
  var ip = ipHeader.match(/^(\d){1,3}\.(\d){1,3}\.(\d){1,3}\.(\d){1,3}/);
  var lan = req.header("accept-language");
  var soft = req.header("user-agent");
  res.json({ipaddress: ip[0], language: lan, software: soft});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
