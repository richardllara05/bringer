const bcrypt = require('bcrypt');
const config = require('../../config')
const dotenv = require('dotenv')

dotenv.config({ path: '../../.env' })
const salt = config['salt']

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {

      const users = [
        { username: 'john', password: bcrypt.hashSync('password1', salt) },
        { username: 'ana', password: bcrypt.hashSync('password2', salt) },
        { username: 'rosa', password: bcrypt.hashSync('password3', salt) }
      ]

      return knex('user').insert(users);
    });
};
