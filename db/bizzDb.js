const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

createNewBizz = (bizz_name, bizz_owner) => {
  return knex('bizzTable')
    .insert({bizz_name, bizz_owner})
}

getBizzByName = (bizz_name) => {
  return knex('bizzTable')
    .where('bizz_name', bizz_name)
}

getBizzListByUser = (user_id) => {
  return knex('bizzTable')
    .where('bizz_owner', user_id)
}

getBuzzListByBizzId = (bizz_id) => {
  return knex('buzzList')
    .where('bizz_id', bizz_id)
    .join('users', 'buzzList.poster_id', 'users.user_id')
    .orderBy('buzz_created_at', 'desc')
}

module.exports = {
  createNewBizz,
  getBizzByName,
  getBizzListByUser,
  getBuzzListByBizzId
}
