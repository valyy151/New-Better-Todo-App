const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const authentication = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('DECODED TOKEN:', decodedToken);
      }
      next();
    });
  } else {
    res.redirect('/login');
  }
};

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
      } else {
        let user = await Users.findById(decodedToken.id);
        res.locals.user = user;
      }
      next();
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { authentication, checkUser };
