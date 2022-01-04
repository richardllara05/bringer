import bcrypt
from typing import List
from flask_jwt_extended import (
    create_access_token,
    decode_token,
    jwt_required,
    get_jwt_identity,
)
from flask.blueprints import Blueprint
from flask import render_template, request, redirect, url_for, current_app, abort
from sqlalchemy.orm.query import Query
from .db import User, db

bp = Blueprint("jwt", __name__)


@bp.route("/")
def index():
    users: List[User] = User.query.all()

    return render_template("jwt/users.html", users=users)


@bp.route("/create-user", methods=["GET", "POST"])
def create_user():
    salt: str = current_app.config["SALT"]

    if request.method == "GET":
        return render_template("jwt/create.html")
    elif request.method == "POST":

        user = {
            "username": request.form["username"],
            "password": bcrypt.hashpw(
                request.form["password"].encode("utf-8"),
                salt),
        }

        new_user: User = User(
            username=user["username"],
            password=user["password"])

        query: Query = db.session.query(
            User.id).filter_by(
            username=user["username"])
        found_user: User = query.first()

        if found_user is None:
            db.session.add(new_user)
            db.session.commit()

            return redirect(url_for("index"))

        abort(500, description="Cannot create user that already exist!")

    return render_template("jwt/index.html")


@bp.route("/delete-user", methods=["DELETE"])
def delete_user():
    username: str = request.form["username"]
    password: str = request.form["password"]

    query: Query = db.session.query(User).filter_by(
        username=username, password=password
    )
    user: User = query.first()

    if user is None:
        return abort(500, description="Cannot delete user that doesn't exist")

    query.delete()
    db.session.commit()

    return redirect(url_for("index"))


@bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("jwt/login.html")
    elif request.method == "POST":

        username: str = request.form["username"]
        password: str = request.form["password"]

        found_user: User = User.query.filter_by(username=username).first()

        if found_user is not None and bcrypt.checkpw(
            password.encode("utf-8"), found_user.password
        ):

            payload = {"uid": found_user.id}

            token: str = create_access_token(identity=payload)
            return redirect(f"/jwt/user?jwt={token}")

        abort(500, description="Token not for user")


@bp.route("/update-password", methods=["PUT"])
def update_user():
    username: str = request.form["username"]
    password: str = request.form["password"]

    query: Query = db.session.query(User).filter_by(username=username)
    user: User = query.first()

    if user is None:
        abort(500, description="Cannot change password for non-existent user")

    user.password = password

    db.session.commit()
    return render_template("jwt/index.html", user=user)


@bp.route("/user", methods=["GET"])
@jwt_required()
def user():
    uid: int = get_jwt_identity()["uid"]
    current_user: User = User.query.filter_by(id=uid).first()

    return render_template(
        "jwt/user.html", user=current_user, token=request.args.get("jwt")
    )


@bp.route("/search-user", methods=["GET", "POST"])
def search_user():
    if request.method == "GET":
        return render_template("jwt/search.html")
    elif request.method == "POST":
        token = decode_token(request.form["token"])
        uid: int = token["sub"]["uid"]
        user: User = User.query.filter_by(id=uid).first()

        return render_template("jwt/user_info.html", user=user)


@bp.errorhandler(500)
def error(err):
    return render_template("error.html", err=err), 500
