
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({first_name:"Harrison", last_name:"Symes", password: '$2a$12$2CvsEtlp4bBQO2cQkc7wmuXzs8rYG/BmY5lP4K3HT7yo81rLhLcV.', email: 'symeshjb@gmail.com'}),
        knex('users').insert({first_name:"Stuart", last_name:"Milner", password: '$2a$12$2CvsEtlp4bBQO2cQkc7wmuXzs8rYG/BmY5lP4K3HT7yo81rLhLcV.', email: 'stuartm@bizzbuzz.com'}),
        knex('users').insert({first_name:"Jasmine", last_name:"Bruce", password: '$2a$12$2CvsEtlp4bBQO2cQkc7wmuXzs8rYG/BmY5lP4K3HT7yo81rLhLcV.', email: 'jasminegwt@bizzbuzz.com'})
      ]);
    });
};
