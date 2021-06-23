from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entity_type = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(80), unique=True, nullable=False)
    entity_id = db.Column(db.Integer, unique=True, nullable=False)
    url = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<Favorite %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "entity_type": self.entity_type,
            "name": self.name,
            "entity_id": self.entity_id,
            "url": self.url,
        }
              
