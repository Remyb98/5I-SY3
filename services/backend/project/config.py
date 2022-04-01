"""Config module for the application

Attributes:
    basedir (str): The basedir of the file
"""
import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config():
    """Config class for the application

    Attributes:
        SQLALCHEMY_DATABASE_URI (str): The database URL
        SQLALCHEMY_TRACK_MODIFICATIONS (bool): Track modification
    """
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
