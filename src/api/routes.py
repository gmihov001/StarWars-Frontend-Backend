"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Favorite
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['POST', 'GET'])
def handle_users():
    user = request.get_json()

    if request.method == 'POST':
        new_user = User(username=user['username'] , email=user['email'], password=user['password'])
        db.session.add(new_user)
        db.session.commit()

    users = User.query.all()
    print('Users', users)
    users_serialized = list(map(lambda x: x.serialize(), users))     

    response_body = {
        "message": "Success",
        "users": users_serialized
    }

    return jsonify(response_body), 200    

@api.route('/user/favorites', methods=['GET'])
def get_favorites():
    username = request.args.get("username")
    if username is None:
        raise APIException('No user found', status_code=404)

    favorites = Favorite.query.filter_by(username=username)
    favorites_serialized = list(map(lambda x: x.serialize(), favorites))

    return jsonify({
        f"{username}'s favorites: " : favorites_serialized
    }), 200

@api.route('/favorite/planets/<int:planet_id>', methods=['POST', 'DELETE'])
def handle_planet(planet_id):
    planet = request.get_json()
    # if planet is None:
    #     planet = {}
    #     planet['username'] = request.args.get("username")

    if request.method == 'POST':
        new_planet = Favorite(entity_type="planet", name=planet['name'], entity_id=planet_id, url=planet['url'], username=planet['username'])
        db.session.add(new_planet)
        db.session.commit()

    if request.method == 'DELETE':
        deleted_planet = Favorite.query.filter_by(entity_type="planet", entity_id=planet_id, username=planet['username']).first()
        print("Deleted: ", deleted_planet)
        if deleted_planet is None:
            raise APIException('The planet does not exist', status_code=404)
        db.session.delete(deleted_planet)
        db.session.commit()            

    favorites = Favorite.query.filter_by(username=planet['username'])
    favorites_serialized = list(map(lambda x: x.serialize(), favorites))

    response_body = {
        "message": "Success",
        f"{planet['username']}'s favorites": favorites_serialized
    }

    return jsonify(response_body), 200        

@api.route('/favorite/people/<int:person_id>', methods=['POST', 'DELETE'])
def handle_people(person_id):
    person = request.get_json()
    # if person is None:
    #     person = {}
    #     person['username'] = request.args.get("username")

    if request.method == 'POST':
        new_person = Favorite(entity_type="person", name=person['name'], entity_id=person_id, url=person['url'], username=person['username'])
        db.session.add(new_person)
        db.session.commit()

    if request.method == 'DELETE':
        deleted_person = Favorite.query.filter_by(entity_type="person", entity_id=person_id, username=person['username']).first()
        print("Deleted: ", deleted_person)
        if deleted_person is None:
            raise APIException('The character does not exist', status_code=404)
        db.session.delete(deleted_person)
        db.session.commit()            

    favorites = Favorite.query.filter_by(username=person['username'])
    favorites_serialized = list(map(lambda x: x.serialize(), favorites))

    response_body = {
        "message": "Success",
        f"{person['username']}'s favorites": favorites_serialized
    }

    return jsonify(response_body), 200            