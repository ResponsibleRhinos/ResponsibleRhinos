const passport = require('passport');
const Github = require('./github');
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: Github.CLIENT_ID,
  clientSecret: Github.CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = passport;