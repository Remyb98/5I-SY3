from flask import Flask, jsonify, request, abort, Response
from flask_cors import cross_origin
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(128), nullable=False)
    lastname = db.Column(db.String(128), nullable=False)
    age = db.Column(db.String(3), nullable=False)

    def __init__(self, firstname, lastname, age):
        self.firstname = firstname
        self.lastname = lastname
        self.age = age

    def __repr__(self):
        return f"<User {self.firstname} {self.lastname} {self.age}>"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


@app.route("/", methods=["POST"])
@cross_origin()
def create():
    data = request.get_json()
    user = User(
        firstname=data["firstname"],
        lastname=data["lastname"],
        age=data["age"]
    )
    db.session.add(user)
    db.session.commit()
    db.session.refresh(user)
    return Response("{'id':'" + str(user.id) + "'}", status=201, mimetype='application/json')


@app.route("/", methods=["GET"])
@cross_origin()
def get_all():
    return jsonify(data=[person.as_dict() for person in User.query.all()])


@app.route("/<int:id>", methods=["GET"])
@cross_origin()
def get_one(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        abort(404)
    return Response("{'id':'" + str(user.id) + "'}", status=201)


@app.route("/<int:id>", methods=["PUT"])
@cross_origin()
def update(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        abort(404)
    data = request.get_json()
    user.firstname = data["firstname"]
    user.lastname = data["lastname"]
    user.age = data["age"]
    db.session.commit()
    return Response("", status=204)


@app.route("/<int:id>", methods=["DELETE"])
@cross_origin()
def delete(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        abort(404)
    db.session.delete(user)
    db.session.commit()
    return Response("", status=204)
