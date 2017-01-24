
exports.seed = function(knex, Promise) {
  return knex('bizzTable').del()
    .then(function () {
      return Promise.all([
        knex('bizzTable').insert({bizz_id: 1, bizz_owner: 1, bizz_name: "Bizz-Buzz"})
      ]);
    });
};
