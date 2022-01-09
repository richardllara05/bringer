import { Model } from 'objection'
import db from '../';

Model.knex(db)

export default class User extends Model {
	static get tableName() {
		return 'user'
	}
}