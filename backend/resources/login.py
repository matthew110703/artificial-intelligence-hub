from flask_restful import Resource, abort
from flask import request, jsonify
import datetime as dt
from db import db
from resources.hashing import verify_password
import time
import base64


class Login(Resource):

    def post(self):
        data = request.json
        user = db.users.find_one({"email": data['email']})
        if user:
            if verify_password(data['password'], user['password']):
                time.sleep(5)
                try:
                    update = {'$set': {"last_login": dt.datetime.now()}}
                    db.users.update_one({"username": user['username']}, update)
                    response = {'username': user['username'], 'is_login': True}
                    return jsonify(response)
                except Exception as e:
                    abort(500, error=f'An error occurred! {str(e)}')
            else:
                abort(400, error="Password incorrect. Please try again using the right password.")

        else:
            abort(400, error="User not found. An error occurred.")
