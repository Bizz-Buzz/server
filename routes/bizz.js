var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var passport = require('../passport')
const userDb = require('../db/userDb')
const bizzDb = require('../db/bizzDb')

router.get('/find', ensureAuthenticated, function(req, res, next) {
  bizzDb.getFollowsByUserId(req.user.user_id)
    .then((follows) => {
      var bizzIds = follows.map((follow) => follow.bizz_id)
      bizzDb.getNotFollowing(bizzIds)
        .then((all_bizz_list) =>{
            bizzDb.getFollowRequestsByUser(req.user.user_id)
            .then((request_array) => {
              var requests = request_array.map((request) => Number(request.bizz_followed))
              res.json({all_bizz_list, requests})
            })
        })
    })
})

router.post('/new', ensureAuthenticated, function(req, res) {
  console.log("create bizz");
  bizzDb.createNewBizz(req.body.bizz_name, req.user.user_id)
    .then((bizz_id) => {
      bizzDb.createFollow(bizz_id[0], req.user.user_id, true)
        .then((follow_id) => {
          bizzDb.getBizzById(bizz_id[0])
            .then((bizz) => {
              res.json({bizz: bizz[0]})
            })
        })
    })
})

/* GET users listing. */
router.get('/buzzList', ensureAuthenticated, function(req, res, next) {
  bizzDb.getBuzzListByBizzId(req.query.bizz_id)
    .then((buzzList) => {
      res.json(buzzList)
    })
  // res.json(req.query.bizz_name)
});

router.post('/buzz/new', ensureAuthenticated, function(req, res) {
  bizzDb.createBuzz(req.body.poster_id, req.body.bizz_id, req.body.buzz_text)
    .then((response) => {
      res.json(response[0])
    })
})

router.post('/request', ensureAuthenticated, function(req, res) {
  bizzDb.createFollowRequest(req.body.user_id, req.body.bizz_id)
    .then((response) => {
      res.json(true)
    })
    .catch((err) => {
      res.send(err)
    })
})

router.get('/requests', ensureAuthenticated, function(req, res) {
  bizzDb.getFollowRequestsByUser(req.user.user_id)
    .then((follow_requests) => {
      res.json({follow_requests})
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
