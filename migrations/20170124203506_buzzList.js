
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('buzzList', table => {
    table.increments('buzz_id')
    table.string('buzz_text')
    table.timestamp('buzz_created_at').defaultTo(knex.fn.now())
    table.integer('poster_id')
    table.integer('bizz_id')
    table.integer('responses')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('buzzList')
};
