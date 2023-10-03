const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./User');

exports.psinit = () => {
  passport.use(new LocalStrategy({
    usernameField: 'useremail', // specify the field name for the email/username
    passwordField: 'userpassword',  // specify the field name for the password
  },
  async (useremail, password, done) => {
    try {
      console.log(useremail, password);
      const user = await User.findOne({ useremail });
      console.log(user);

      if (!user) {
        console.log("Not a user");
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      // Retrieve the stored password from the user document
      const storedPassword = user.userpassword;

      // Compare the provided password with the stored password (plain text comparison)
      if (password !== storedPassword) {
        console.log("password mismatch");
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      console.log("log in success");
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  // ... other passport configuration
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.finone({_id : id}, (err, user) => {
      if (err) {
        console.log("error in deserializing: ", err);
        return done(err);
      }
      return done(null, user);
    });
  });
};
