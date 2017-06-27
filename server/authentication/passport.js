const passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var Models = require('../models');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `http://${process.env.HOST_URL}/auth/github/callback`
},
  function(accessToken, refreshToken, profile, cb) {
    console.log("The access token is,", accessToken);
    Models.users.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, "some user");
    });
  }
));

module.exports = passport;