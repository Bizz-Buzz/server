const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getUserByEmail = (email) => {
  return knex('users')
    .where('email', email)
}

createNewUser = (username, first_name, last_name, email, password) => {
  return knex('users')
    .insert({username, first_name, last_name, email, password})
}

module.exports = {
  getUserByEmail,
  createNewUser
}
