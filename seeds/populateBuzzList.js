
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('buzzList').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('buzzList').insert({buzz_id: 1, buzz_text: 'Bizz-Buzz is cool', poster_id: 2, bizz_id: 1, responses: 0}),
        knex('buzzList').insert({buzz_id: 2, buzz_text: 'Can someone cover my shift?', poster_id: 1, bizz_id: 1, responses: 0}),
        knex('buzzList').insert({buzz_id: 3, buzz_text: 'I hope chat is added soon', poster_id: 3, bizz_id: 1, responses: 0}),
        knex('buzzList').insert({buzz_id: 4, buzz_text: 'My name is jeff', poster_id: 1, bizz_id: 1, responses: 0})
      ]);
    });
};
