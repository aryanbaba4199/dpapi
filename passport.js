const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



passport.use(new LocalStrategy(
  function(useremail, password, done) {
    User.authenticate()(useremail, password, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, console.log('hi'));
    });
  }
));



passport.serializeUser = function(user,done) {
    done(null, user.id);
};

passport.deserializeUser = function(id, done) {
    User.findById(id, function(err, user) {
        if (err) { 
            console.log("error in deserializing : ", err)
            return done(err);
        }
        return done(null, user);
    });
}

module.exports = passport;