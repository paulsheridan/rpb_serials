""" An intermediary bootstrapping file that makes factories of various reusable app components. """

import os
import typing as t
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from api.models import db


def app_factory(config: t.Optional[t.Dict[str, t.Any]] = None) -> Flask:
    """ Bootstraps a Flask application and adds dependencies to the resulting object.

    Example:
        from flask import current_app as app

        ...

        def my_method():
            with app.app_context():
                result = app.db.session.query(MyModel).first()

    Args:
        config (Optional[Dict[str, Any]]): A configuration object to update the app's config with

    Returns:
        Flask: The bootstrapped flask application object with a liberal CORS policy and db
    """
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "SQLALCHEMY_DATABASE_URI")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = bool(
        os.environ.get("SQLALCHEMY_TRACK_MODIFICATIONS", 0)
    )
    app.config["DEBUG"] = True
    app.config["SECRET_KEY"] = b'H\x12`\xc9\xf6\xae\xcbD\xddU\x92\x13"-{\x96s\xde\x9bY\x06\xb7{\x05'
    app.config["GOOGLE_CLIENT_ID"] = "161417844290-ueic5i3perjmooskhmoea4mk9a542mm1.apps.googleusercontent.com"
    app.config.update(**(config or {}))
    app.db = database_factory(app)
    CORS(app, resources={r"/graphql*": {"origins": "*"}})
    JWTManager(app)
    return app


def database_factory(app: Flask) -> SQLAlchemy:
    """ Bootstraps SQLAlchemy for use with the Flask-SQLAlchemy extension.

    Args:
        app (Flask): The flask app to add this db engine to

    Returns:
        SQLAlchemy: The SQLAlchemy engine with models registered
    """
    db.init_app(app)
    return db
