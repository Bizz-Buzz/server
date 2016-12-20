const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

createNewBizz = (bizz_name, bizz_owner) => {
  return knex('bizzTable')
    .insert({bizz_name, bizz_owner})
}

getBizzListByUser = (user_id) => {
  return knex('bizzTable')
    .where('bizz_owner', user_id)
}

module.exports = {
  createNewBizz,
  getBizzListByUser
}
