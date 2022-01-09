exports.up = knex => knex.schema.createTable('user', user => {
	user.increments('id'),
		user.string('username'),
		user.string('password');
});

exports.down = knex => knex.schema.dropTable('user')
