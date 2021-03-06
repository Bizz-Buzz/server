
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', table => {
    table.increments('user_id')
    table.string('username')
    table.string('first_name')
    table.string('last_name')
    table.string('email')
    table.string('password')
    table.timestamp('user_created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
