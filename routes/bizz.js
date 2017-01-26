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

router.get('/', ensureAuthenticated, function(req, res, next) {
  //console.log(req.user);
  bizzDb.getFollowsByUserId(req.user.user_id)
    .then((follows) => {
      var bizzIds = follows.map((follow) => follow.bizz_id)
      bizzDb.getNotFollowing(bizzIds)
        .then((all_bizz_list) =>{
          res.send(all_bizz_list)
        })
    })
})

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    console.log('no auth', req.user);
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
