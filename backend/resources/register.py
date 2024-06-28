from flask_restful import Resource, abort
from flask import request, jsonify
import datetime as dt
from db import db
from resources.hashing import hash_password
import time


class Register(Resource):
    def post(self):
        data = request.json
        user = db.users.find_one({"username": data['username']})
        if user:
            abort(404, error='Username already exists. Please choose a different username.')
        time.sleep(5)    
        try:
            username, email = data['username'], data['email']
            password = hash_password(data['password'])

            if username and email and password:
                try:
                    db.users.insert_one({
                        'username': username,
                        'email': email,
                        'password': password,
                        'created_at': dt.datetime.now()
                    })
                except Exception as e:
                    abort(500, error=f'{str(e)}')
                else:
                    return jsonify({'success': 'User created successfully'})

        except Exception as e:
            abort(400, error=f'Provide this field: {str(e)}')
