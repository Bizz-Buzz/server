
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({username: 'symesharr', first_name:"Harrison", last_name:"Symes", password: 'admin', email: 'symeshjb@gmail.com'})
      ]);
    });
};
