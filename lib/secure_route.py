from functools import wraps
import jwt
from flask import request, jsonify, g
from config.environment import secret
from models.User import User

def secure_route(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        try:
            payload = jwt.decode(token, secret)
            g.current_user = User.get(id=payload['sub'])

        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 401

        return func(*args, **kwargs)

    return wrapper
