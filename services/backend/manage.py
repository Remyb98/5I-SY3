from flask.cli import FlaskGroup

from project import app, db, User


cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()
    seed_db()


@cli.command("seed_db")
def seed_db():
    db.session.add(User(firstname="John", lastname="Doe", age="12"))
    db.session.add(User(firstname="Rémy", lastname="Barberet", age="12"))
    db.session.add(User(firstname="Léo", lastname="Chardon", age="12"))
    db.session.commit()


if __name__ == "__main__":
    cli()
