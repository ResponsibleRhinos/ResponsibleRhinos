require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var models = require('./models');
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
  models.users()
  .then((result)=>{
    res.end(JSON.stringify(result));
  });
});

app.get('/auth/github',
  passport.authenticate('github')
);

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
