const express = require('express');
const route = express.Router();
const Problems = require('../models/problems');

route.post('/', async (req, res) => {
  try {
    let sentData = new Problems(req.body);
    await sentData.save();
    console.log('Problem submitted successfully:', sentData.message);
    res.render('submit', sentData);
  } catch (err) {
    res.status(400).send(err, 'Error while saving to Database');
  }
});

route.get('/', (req, res) => {
  res.render('submit');
});

module.exports = route;
