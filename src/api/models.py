from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    favorites = db.relationship('Favorite', backref='user')

    # def __repr__(self):
    #     return '<User %r>' % self.username

    # def serialize(self):
    #     return {
    #         "id": self.id,
    #         "username": self.username,
    #         "email": self.email,
    #         "favorites": self.favorites,
    #         # do not serialize the password, its a security breach
    #     }

    # # def serialize(self):
    # #     if self.favorites:
    # #         favorites = [upload.serialize_upload_bis() for upload in self.favorites]
    # #     return {
    # #             "id": self.id,
    # #             "username": self.username,
    # #             "email": self.email,
    # #             "favorites": favorites,
    # #     }

    # # Upload serializer
    # def serialize_upload_bis(self):
    #     return {
    #         "name": self.name,
    #         "path_to_file": self.path_to_file,
    #     }

    # def serialize_upload(self):
    #     if self.user:
    #         dict_user = self.user.serialize_user()
    #     return {
    #         "name": self.name,
    #         "path_to_file": self.path_to_file,
    #         "user": dict_user
    #     }

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
    name = db.Column(db.String(80), unique=True, nullable=False)
    entity_id = db.Column(db.Integer, unique=True, nullable=False)
    url = db.Column(db.String(200), unique=False, nullable=False)
    username = db.Column(db.String(120), db.ForeignKey('user.username'), unique=False, nullable=False)

    def __repr__(self):
        return '<Favorite %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "entity_type": self.entity_type,
            "name": self.name,
            "entity_id": self.entity_id,
            "url": self.url,
            "username": self.username,
        }

class Planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    entity_id = db.Column(db.Integer, unique=True, nullable=False)
    url = db.Column(db.String(200), unique=False, nullable=False)
    favorite = db.Column(db.Integer, db.ForeignKey('favorite.id'), unique=False, nullable=False)

    def __repr__(self):
        return '<Planet %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "entity_id": self.entity_id,
            "url": self.url,
        }

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    entity_id = db.Column(db.Integer, unique=True, nullable=False)
    url = db.Column(db.String(200), unique=False, nullable=False)
    favorite = db.Column(db.Integer, db.ForeignKey('favorite.id'), unique=False, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "entity_id": self.entity_id,
            "url": self.url,
        }                
              
