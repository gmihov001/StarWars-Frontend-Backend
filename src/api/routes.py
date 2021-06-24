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
    print(request.get_json())
    print(request.get_data())
    print(request.args.get("username"))
