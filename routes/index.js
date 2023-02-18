const express = require('express');
const route = express.Router();
const ongoingTasks = require('../models/ongoing');

route.get('/', (req, res) => {
  res.render('index');
});

route.post('/', async (req, res) => {
  const { text, user, date } = req.body;

  try {
    const createTask = await ongoingTasks.create(text, user, date);
    if (createTask) {
      console.log(createTask);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = route;
