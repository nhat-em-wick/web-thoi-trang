const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  // check token exists & is verified
  if (token) {
    try {
      const decodeToken = await jwt.verify(token, process.env.TOKEN_SECRET);
      next();
    } catch (error) {
      res.redirect("/auth");
    }
  } else {
    res.redirect("/auth");
  }
};

const checkUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodeToken = await jwt.verify(token, process.env.TOKEN_SECRET);
      let user = await User.findById(decodeToken.id);
      res.locals.user = user;
      next();
    } catch (error) {
      res.locals.user = null;
      next()
    }
  } else {
    res.locals.user = null;
    next()
  }
};

module.exports = { requireAuth, checkUser };
