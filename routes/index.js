const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body;
  console.log(password);
  bcrypt.hash(password, 10, (err, hash) => {
    const user = new User({
      username,
      password: hash
    });
    const createUserPromise = user.save();
    createUserPromise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    username
  }, (err, user) => {
    if (err)
      throw err;
    if (!user) {
      res.json({
        status: false,
        message: 'Authentication failed, user not found!'
      });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: 'Authentication failed, wrong password!'
          });
        } else {
          const payload = {
            username
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 600 // 10 saat
          });
          res.json({
            status: true,
            token
          })
        }
      })
    }
  });
});

module.exports = router;
