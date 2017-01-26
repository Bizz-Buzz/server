
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('follows', table => {
    table.increments('follow_id')
    table.string('bizz_id')
    table.string('user_id')
    table.boolean('admin').defaultTo(false)
    table.timestamp('user_created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('follows')
};
