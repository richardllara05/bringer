import secrets
import bcrypt

class Config:
	JWT_SECRET_KEY = secrets.token_urlsafe(16)
	SQLALCHEMY_DATABASE_URI = f'sqlite:///../data/users.db'
	SALT = bcrypt.gensalt()
	JWT_TOKEN_LOCATION = ['headers', 'query_string']
	FLASK_APP='__init__'

class DevConfig(Config):
	ENV = 'development'
	DEBUG = True

class ProdConfig(Config):
	ENV = 'production'
	DEBUG = False
