
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('bizzTable', table => {
    table.increments('bizz_id')
    table.string('bizz_name')
    table.timestamp('bizz_created_at').defaultTo(knex.fn.now())
    table.integer('bizz_members').defaultTo(1)
    table.integer('bizz_owner')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bizzTable')
};
