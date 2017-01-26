
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('follows').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('follows').insert({bizz_id: 1, user_id: 1}),
        knex('follows').insert({bizz_id: 1, user_id: 2}),
        knex('follows').insert({bizz_id: 1, user_id: 3}),
        knex('follows').insert({bizz_id: 2, user_id: 1}),
        knex('follows').insert({bizz_id: 2, user_id: 1}),
        knex('follows').insert({bizz_id: 3, user_id: 3}),
        knex('follows').insert({bizz_id: 2, user_id: 3})
      ]);
    });
};
