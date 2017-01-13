var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var passport = require('../passport')
const userDb = require('../db/userDb')
const bizzDb = require('../db/bizzDb')

/* GET users listing. */
router.get('/home', ensureAuthenticated, function(req, res, next) {
  console.log(req.query.bizz_name);
  bizzDb.getBizzByName(req.query.bizz_name)
    .then((response) => {
      console.log({response[0]});
      res.json(response[0])
    })
  // res.json(req.query.bizz_name)
});

// router.post('/login', (req, res) => {
//   userDb.getUserByUsername(req.body.username)
//     .then((user) => {
//       res.json(user)
//     })
//   // res.send(`Logging in as ${req.body.username}`)
// })

router.post('/signup', (req, res) => {
  console.log(req.body);
})

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.json({
      'error':
      {
        'type': 'auth',
        'code': 401,
        'message': 'authentication failed'
      }
    })
  }
}

module.exports = router;
