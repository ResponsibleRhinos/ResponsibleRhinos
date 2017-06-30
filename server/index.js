require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var Models = require('./models');
var passport = require('./authentication/passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var port = process.env.PORT || 3000;
var app = express();

process.env.PWD = process.cwd();
app.use(express.static(process.env.PWD + '/react-client/dist'));
app.use(bodyParser.json());

app.use(morgan('combined'));
app.use(cookieParser());

app.get('/users', function(req, res) {
  Models.users.get()
  .then((result)=>{
    res.end(JSON.stringify(result));
  })
  .catch((err)=>{
    console.log("Loggin the error", err);
    res.end();
  });
});

app.post('/map', function(req, res) {
  console.log("got to the post for map");
  req.body.state.currentCenter = `${req.body.state.currentCenter.lat}/${req.body.state.currentCenter.lng}`;
  console.log(req.body.state);
  var mapId = null; 
  Models.maps.create(req.body.state)
  .then((result)=>{
    mapId = result[0]["currval"];
    console.log("what are wer running map on:", req.body.state.markers);
    return Promise.map(req.body.state.markers, (marker)=>{
      var mark = {
        'lat': marker.position.lat,
        'lng': marker.position.lng,
        'mapId': mapId,
        'info': '',
        'icon': ''
      };
      console.log("mark is: ", mark);
      return Models.markers.create(mark);
    })
    .then((result)=>{
      console.log("results from marker create", result);
      res.end(map_id);
    });
  })
  .catch((err)=>{
    console.log("There was an error:", err);
    console.log("I didnt add the app or any markers");
    res.end();
  });
});

app.get('/map/:mapId', function(req, res) {
  console.log("got to the post for map");
  Models.maps.get(req.params.mapId)
  .then((result)=>{
    console.log("Result from grabbing a map and its markers:", result);
    res.send(); //TODO figure out how to send back the hash with all the data.
  })
  .catch((err)=>{
    console.log("There was an error:", err);
    console.log("Not able to get the map requested.");
    res.end();
  });
});

app.put('/map/:mapId', function(req, res) {
  console.log(req.body);
  Models.maps.update()
  .then((result)=>{
    console.log("Result form Maps.create:",result);
    res.end();
  })
  .catch((err)=>{
    console.log("There was an error:", err);
    console.log("I didnt add the app or any markers");
    res.end();
  });
});

//---PASSPORT----

app.use(passport.initialize());
app.use(passport.session());

//---Github Authentication--
app.get('/auth/github', function(req, res, next) {
  console.log(req.headers);
  next();
});

app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }) );

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

//--Passport--


app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
