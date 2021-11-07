const express = require('express');
const router = express.Router();
const Director = require('../models/Director');

router.get('/', (req, res) => {
  const allDirectorsPromise = Director.find({});
  allDirectorsPromise.then((directors) => {
    res.json('directors');
  }).catch((err) => {
    res.json(err);
  });
});

router.post('/', (req, res) => {
  const director = new Director(req.body);
  const createdDirectorPromise = director.save();
  createdDirectorPromise.then((data) => {
    res.json({status: 200, message: 'Created new director.'});
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
