const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  // if password is empty or < 8 characters -> 
  // show the form again with error message
  const { username, password } = req.body;
  console.log(username);
  if (password.length < 8) {
    res.render('signup', { message: 'Your password needs to be 8 chars min' });
    return;
  }
  if (username === '') {
    res.render('signup', { message: 'Your username cannot be empty' });
    return;
  }
  // check if username exists in database -> show message
  User.findOne({ username: username })
    .then(found => {
      if (found !== null) {
        res.render('signup', { message: 'This username is already taken' });
      } else {
        // hash the password, create the user and redirect to profile page
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        User.create({
          username: username,
          password: hash
        })
          .then(dbUser => {
            // log the user in
            res.render('dashboard', { user: dbUser });
          })
      }
    })

});

module.exports = router;