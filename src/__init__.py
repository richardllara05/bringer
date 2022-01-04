from flask import Flask
from flask.templating import render_template
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
import os


from .utils.filter import pkg_date, pkg_location, pkg_status
from .db import db


def create_app():

    app = Flask(__name__)
    jwt = JWTManager(app)

    load_dotenv()

    if os.environ["CONFIG"] == "dev":
        app.config.from_object("config.DevConfig")
    elif os.environ["CONFIG"] == "prod":
        app.config.from_object("config.ProdConfig")

    db.init_app(app)

    with app.app_context():
        app.jinja_env.filters["pkg_date"] = pkg_date
        app.jinja_env.filters["pkg_location"] = pkg_location
        app.jinja_env.filters["pkg_status"] = pkg_status

        from . import track
        from . import jwt

        db.create_all()

        @app.route("/")
        def index():
            return render_template("index.html")

        app.register_blueprint(jwt.bp, url_prefix="/jwt")
        app.register_blueprint(track.bp, url_prefix="/track")

    return app
