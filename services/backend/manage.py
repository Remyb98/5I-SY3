"""Module for run command and start the server
"""
from flask.cli import FlaskGroup

from project import app, db, User


cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    """Create the database
    """
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    """Add fixtures to the database
    """
    db.session.add(User(firstname="John", lastname="Doe", age="32"))
    db.session.add(User(firstname="Jane", lastname="Doe", age="30"))
    db.session.commit()


if __name__ == "__main__":
    cli()
