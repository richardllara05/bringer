from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column("uid", db.Integer, primary_key=True, autoincrement=True)
    username = db.Column("username", db.String(40))
    password = db.Column("password", db.String(40))

    def __init__(self, username, password) -> None:
        self.username = username
        self.password = password

    def __str__(self):
        return str(self.id)
