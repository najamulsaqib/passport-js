const User = require("../utils/db").User;
const passport = require("passport");
require("../utils/passportConfig")(passport);

async function signup(req, res) {
  try {
    User.create(req.body).then((result, err) => {
      if (err) {
        res.redirect('/signup');
        return;
      } else if (result) {
        res.redirect('/login');
        return;
      }
    });
  } catch (err) {
    res.redirect('/signup');
  }
}

function checkAuth(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
function checkNotAuth(req, res, next) {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}
function logout(req, res) {
    req.logOut();
    res.redirect('/login');
}
module.exports = {
  signup,
  checkAuth,
  checkNotAuth,
  logout
};
