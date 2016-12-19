var express = require('express');
var router = express.Router();
const userDb = require('../db/userDb')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({users: [{name: 'Timmy'}]});
});

router.post('/login', (req, res) => {
  userDb.getUserByUsername(req.body.username)
    .then((user) => {
      res.json(user)
    })
  // res.send(`Logging in as ${req.body.username}`)
})

router.post('/signup', (req, res) => {
  console.log(req.body);
})
module.exports = router;
