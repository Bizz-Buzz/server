var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var passport = require('../passport')
const userDb = require('../db/userDb')
const bizzDb = require('../db/bizzDb')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({users: [{name: 'Timmy'}]});
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log("login");
  bizzDb.getFollowsByUserId(req.user.user_id)
    .then((follows) => {
      console.log({follows});
      var bizzIds = follows.map((follow) => follow.bizz_id)
      bizzDb.getBizzListByBizzIdArray(bizzIds)
      .then((bizz_list) => {
        console.log({bizz_list});
        res.json({'user': req.user, bizz_list})
      })
      .catch((err) => {
        res.json({err})
      })
    })
})

// router.post('/login', (req, res) => {
//   userDb.getUserByUsername(req.body.username)
//     .then((user) => {
//       res.json(user)
//     })
//   // res.send(`Logging in as ${req.body.username}`)
// })

router.post('/signup', (req, res) => {
  console.log("req body", req.body);
  userDb.getUserByEmail(req.body.email)
    .then((user) => {
      console.log({user});
      if (user.length === 0) {
        bcrypt.genSalt(12, (err, salt) => {
          if (err) res.json({err})
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) res.json({err})
            console.log({hash});
            userDb.createNewUser(req.body.first_name, req.body.last_name, req.body.email, hash)
              .then((user_id) => {
                console.log({user_id});
                res.json({user_id})
              })
          })
        })
      } else res.json({err: "email already taken"})
    })
})

module.exports = router;
