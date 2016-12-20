const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getUserByEmail = (email) => {
  return knex('users')
    .where('email', email)
}

getUserById = (id) => {
  return knex('users')
    .where('user_id', id)
}

createNewUser = (username, first_name, last_name, email, password) => {
  return knex('users')
    .insert({username, first_name, last_name, email, password})
}

module.exports = {
  getUserByEmail,
  getUserById,
  createNewUser
}
