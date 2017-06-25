var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
process.env.PWD = process.cwd() || __dirname;
var app = express();

app.use(express.static(process.env.PWD + '/../react-client/dist'));

app.get('/', function(req, res) {
  res.send('hello world!');
});

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

