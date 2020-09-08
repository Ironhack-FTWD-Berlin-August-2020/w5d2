const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

const loginCheck = () => {
  return (req, res, next) => {
    // if the user is logged in proceed with the next step
    if (req.session.user) {
      next();
    } else {
      // else redirect to login
      res.redirect('/login');
    }
  }
}

router.get('/dashboard', loginCheck(), (req, res, next) => {
  console.log('this is the user: ', req.session.user);
  // res.clearCookie('myCookie');
  // console.log(req.cookies);
  res.render('dashboard', { user: req.session.user });
});

module.exports = router;
