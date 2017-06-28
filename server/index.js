require('dotenv').config();
var GitHubStrategy = require('passport-github2').Strategy;

var express = require('express');
var bodyParser = require('body-parser');
var Models = require('./models');
var passport = require('passport');
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
  });
});

//---PASSPORT----

app.use(passport.initialize());
app.use(passport.session());
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `http://${process.env.HOST_URL}/auth/github/callback`
},
  function(accessToken, refreshToken, profile, cb) {
    Models.users.findOrCreate(profile.id)
    .then((result)=>{
      console.log("running cb with", result);
      cb(null, result);
    })
    .catch((err)=>{
      cb(err, null);
    });
  }
));


//--Passport--


app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    console.log("successful sign in");
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
