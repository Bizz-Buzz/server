
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('buzzList').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('buzzList').insert({buzz_id: 1, buzz_text: 'Bizz-Buzz is cool', poster_id: 1, bizz_id: 1, responses: 0}),
        knex('buzzList').insert({buzz_id: 2, buzz_text: 'Oh yes I agree ', poster_id: 1, bizz_id: 1, responses: 0}),
        knex('buzzList').insert({buzz_id: 3, buzz_text: 'It is even better than facebook', poster_id: 1, bizz_id: 1, responses: 0}),
        knex('buzzList').insert({buzz_id: 4, buzz_text: 'Okay maybe not that good', poster_id: 1, bizz_id: 1, responses: 0})
      ]);
    });
};
