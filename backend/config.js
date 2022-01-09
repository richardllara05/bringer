const dotenv = require('dotenv')
const crypto = require('crypto')

dotenv.config()

const env = process.env.CONFIG;

const config = {
	dev: {
		app: {
			port: process.env.DB_PORT
		},
		db: {
			name: process.env.DB_URI
		},
		jwtSecretKey: crypto.randomBytes(256).toString('base64'),
		salt: '$2b$10$q5rRPRwE597PdUZl.e3.0u'
	}
}[env]

module.exports = config;