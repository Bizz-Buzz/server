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

getBizzById = (bizz_id) => {
  return knex('bizzTable')
    .where('bizz_id', bizz_id)
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

createBuzz = (poster_id, bizz_id, buzz_text) => {
  return knex('buzzList')
    .insert({poster_id, bizz_id, buzz_text})
}

getNotFollowing = (bizzIds) => {
  return knex('bizzTable')
    .whereNotIn('bizz_id', bizzIds)
}

createFollow = (bizz_id, user_id, admin) => {
  return knex('follows')
    .insert({bizz_id, user_id, admin})
}

createFollowRequest = (user_id, bizz_id) => {
  return knex('followRequests')
    .insert({follower_id: user_id, bizz_followed: bizz_id})
}

getFollowRequestsByUser = (user_id) => {
  return knex
    .select('bizz_followed')
    .from('followRequests')
    .where('follower_id', user_id)
}

getFollowRequestsByBizzId = (bizz_id) => {
  return knex('followRequests')
    .join('users', 'followRequests.follower_id', 'users.user_id')
    .where('followRequests.bizz_followed', bizz_id)
}

deleteFollowRequestById = (request_id) => {
  return knex('followRequests')
    .where('request_id', request_id)
    .del()
}

getFollowRequestById = (request_id) => {
  console.log({request_id});
  return knex('followRequests')
    .where('request_id', request_id)
}


createFollow

module.exports = {
  createNewBizz,
  createBuzz,
  createFollow,
  getBizzByName,
  getBizzById,
  getFollowsByUserId,
  getBizzListByBizzIdArray,
  getBuzzListByBizzId,
  getNotFollowing,
  createFollowRequest,
  getFollowRequestsByUser,
  getFollowRequestsByBizzId,
  deleteFollowRequestById,
  getFollowRequestById
}
