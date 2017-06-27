var express = require('express');
var bodyParser = require('body-parser');
var models = require('./models');

var port = process.env.PORT || 3000;
var app = express();

process.env.PWD = process.cwd();
app.use(express.static(process.env.PWD + '/react-client/dist'));

app.get('/users', function(req, res) {
  models.users()
  .then((result)=>{
    res.end(JSON.stringify(result));
  });
});

// app.get('/', function(req,res) {
//   res.sendFile('/../react-client/dist');
// }) 
// app.get('/', function(req, res) {
//   res.send('hello world!');
// });

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});


/**
var express = require('express');
var bodyParser = require('body-parser');
//var models = require('./models');

var port = process.env.PORT || 3000;
var app = express();

process.env.PWD = process.cwd();
app.use(express.static(process.env.PWD + '/react-client/dist'));

app.get()

// app.get('/users', function(req,res) {
//   console.log(models.users);
//   res.end();
// }) 

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

*/
