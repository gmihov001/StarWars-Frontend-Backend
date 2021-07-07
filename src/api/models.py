from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    favorites = db.relationship('Favorite', backref='user')

    def __repr__(self):
        return '<User id=%r, username=%r, email=%r, password=%r>' % (self.id, self.username, self.email, self.password)

    def serialize(self):
        return {
                    "id": self.id,
                    "username": self.username,
                    "email": self.email,
                    "favorites": [favorite.serialize() for favorite in self.favorites],
            }    

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entity_type = db.Column(db.String(120), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    entity_id = db.Column(db.Integer, unique=False, nullable=False)
    url = db.Column(db.String(200), unique=False, nullable=False)
    username = db.Column(db.String(120), db.ForeignKey('user.username'), unique=False, nullable=False)

    def __repr__(self):
        return '<Favorite id=%r, entity_type=%r, name=%r, entity_id=%r, url=%r, username=%r>' % (self.id, self.entity_type, self.name, self.entity_id, self.url, self.username)

    def serialize(self):
        return {
            "id": self.id,
            "entity_type": self.entity_type,
            "name": self.name,
            "entity_id": self.entity_id,
            "url": self.url,
            "username": self.username,
        }

              
