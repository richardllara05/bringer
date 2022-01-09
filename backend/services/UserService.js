import User from '../db/models/user'
import bcrypt from 'bcrypt';
import config from '../config';

class UserService {
	static createUser = ({ username, password }) => {
		const hashedPassword = bcrypt.hashSync(password, config['salt'])

		return User.query()
			.insert({
				"username": username,
				"password": hashedPassword
			})
	}

	static deleteUser = ({ id }) => {

		return this.selectById(id)
			.delete()
	}

	static selectAll = () => {
		return User.query()
			.orderBy('username')
	}

	static selectById = id => {

		return User.query()
			.findById(id)
			.skipUndefined()
			.first()
	}

	static selectByUsername = ({ username }) => {
		return User.query()
			.findOne({ username })
			.skipUndefined()
	}

	static updateUser = ({ id, username, password }) => {
		let hashedPassword = null

		if (id) {
			return this.selectById(id)
				.then(async user => {
					if (username) {
						const existingUser = await this.selectByUsername({ username })

						if (existingUser) {

							return Promise.reject('User already defined')
						}
					}

					if (password) {
						hashedPassword = bcrypt.hashSync(password, config['salt'])
					}

					if (username && password) {

						return this.selectById(id)
							.patch({
								username,
								password: hashedPassword
							})
					}
					else if (username) {

						return this.selectById(id)
							.skipUndefined()
							.patch({
								username
							})
					} else if (password) {

						this.selectById(id)
							.patch({
								username,
								password: hashedPassword
							})
					} else {
						return Promise.reject('Add username or password')
					}

					return Promise.resolve({ 'status': 'User updated' })
				})
				.catch(err => {
					return { 'status': err }
				})
		}

		return Promise.reject({ 'status': 'Missing id' })


	}

	static validateUser = ({ username, password }) => {
		const hashedPassword = bcrypt.hashSync(password, config['salt'])

		return this.selectByUsername(username)
			.then(user => Promise.resolve(user))
	}
}

export default UserService;