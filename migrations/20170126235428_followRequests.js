
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('followRequests', table => {
    table.increments('request_id')
    table.string('follower_id')
    table.string('bizz_followed')
    table.timestamp('request_created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('followRequests')
};
