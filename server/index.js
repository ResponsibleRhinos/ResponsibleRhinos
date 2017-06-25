var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/', function(req, res) {
  res.send('hello world!');
})

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

