const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
});

module.exports = route;
