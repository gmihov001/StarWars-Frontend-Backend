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
        return "No user found", 404

    favorites = Favorite.query.filter_by(username=username)
    favorites_serialized = list(map(lambda x: x.serialize(), favorites))

    return jsonify({
        f"{username}'s favorites: " : favorites_serialized
    }), 200

@api.route('/favorite/planet/<int:planet_id>', methods=['POST', 'DELETE'])
def handle_planet(planet_id):
    planet = request.get_json()

    if request.method == 'POST':
        new_planet = Favorite(entity_type="planet", name=planet['name'], entity_id=planet_id, url=planet['url'], username=planet['username'])
        db.session.add(new_planet)
        db.session.commit()

    if request.method == 'DELETE':
        planet = Favorite.query.filter_by(entity_type="planet", entity_id=planet_id)
        print(todo)
        if todo is None:
            raise APIException('The entry does not exist', status_code=400)
        db.session.delete(todo)
        db.session.commit()
        todos = Todo.query.filter_by(username=username)
        todos = list(map(lambda x: x.serialize(), todos))
        return jsonify(todos), 200   
            

    favorites = Favorite.query.filter_by(username=planet['username'])
    favorites_serialized = list(map(lambda x: x.serialize(), favorites))

    response_body = {
        "message": "Success",
        f"{planet['username']}'s favorites": favorites_serialized
    }

    return jsonify(response_body), 200        