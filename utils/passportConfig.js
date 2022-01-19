const User = require("../utils/db").User;
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }).then((user, err) => {
        if (err) throw err;
        if (!user) {
          return done(null, false, {msg: "No user with this email!"});
        } else {
          if (user.password === password) {
            return done(null, user);
          } else {
            return done(null, false, {msg: "Password incorrect!"});
          }
        }
      });
    })
  );
  passport.serializeUser((user, done)=>{
    done(null, user.id);
  });
  passport.deserializeUser((id, done)=>{
    User.findOne({ _id: id }, (err, user) => {
        if (err) return done(err);
        return done(null, user);
      });
  });

};
