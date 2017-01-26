var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var passport = require('../passport')
const userDb = require('../db/userDb')
const bizzDb = require('../db/bizzDb')

/* GET users listing. */
router.get('/buzzList', ensureAuthenticated, function(req, res, next) {
  console.log(req.query.bizz_name);
  bizzDb.getBuzzListByBizzId(req.query.bizz_id)
    .then((buzzList) => {
      res.json(buzzList)
    })
  // res.json(req.query.bizz_name)
});



function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    console.log("no auth");
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
