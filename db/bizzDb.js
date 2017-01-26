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

getFollowsByUserId = (user_id) => {
  return knex
    .select('bizz_id')
    .from('follows')
    .where('user_id', user_id)
}

getBizzListByBizzIdArray = (bizzIds) => {
  return knex('bizzTable')
    .whereIn('bizz_id', bizzIds)
}

getBuzzListByBizzId = (bizz_id) => {
  return knex('buzzList')
    .where('bizz_id', bizz_id)
    .join('users', 'buzzList.poster_id', 'users.user_id')
    .orderBy('buzz_created_at', 'desc')
}

getNotFollowing = (bizzIds) => {
  return knex('bizzTable')
    .whereNotIn('bizz_id', bizzIds)
}

module.exports = {
  createNewBizz,
  getBizzByName,
  getFollowsByUserId,
  getBizzListByBizzIdArray,
  getBuzzListByBizzId,
  getNotFollowing
}
