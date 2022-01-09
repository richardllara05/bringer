import knex from 'knex';
import config from '../config'


const db = knex({
	client: 'sqlite3',
	connection: {
		filename: config.db["name"]
	}
})

export default db;