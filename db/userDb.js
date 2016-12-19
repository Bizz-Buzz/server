const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getUserByUsername = (username) => {
  return knex('users')
    .where('username', username)
}


module.exports = {
  getUserByUsername
}
