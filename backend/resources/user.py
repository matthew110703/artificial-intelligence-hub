from flask_restful import Resource, abort
from flask import request, jsonify
import datetime as dt
from resources.hashing import hash_password, verify_password
from db import db


class User(Resource):

    def get(self):
        params = request.args
        if 'username' or 'email' in params:
            username = params.get('username', None)

            email = params.get('email', None)
            if not username and not email:
                abort(400, error="username or email is required")
            try:
                user = db.users.find_one({"username": username} if username else {"email": email})
            except Exception as e:
                abort(500, error=str(e))
            else:
                if user:
                    user.pop('_id')
                    return jsonify(user)
                else:
                    abort(404, error="User not found")
        else:
            abort(400, error="username or email is required")

    def put(self):
        params = request.args
        data = request.json

        if 'username' in params:
            username = params['username']
            if 'password' in data:
                data['password'] = hash_password(data['password'])
            data['last_updated'] = dt.datetime.now()
            update = {"$set": data}
            try:
                user = db.users.update_one({"username": username}, update)
            except Exception as e:
                abort(500, error=str(e))
            else:
                if user.matched_count == 1:
                    return jsonify({'success': 'User updated successfully'})
                else:
                    abort(404, error="User not found")

        else:
            abort(400, error="username is required")

    def delete(self):

        params = request.args
        if 'username' in params:
            username = params['username']
            try:
                user = db.users.delete_one({"username": username})
            except Exception as e:
                abort(500, error=str(e))
            else:
                if user.deleted_count == 1:
                    return jsonify({'success': 'User deleted successfully'})
                else:
                    abort(404, error="User not found")
        else:
            abort(400, error="username is required")


class UserResetPassword(Resource):

    def put(self):
        data = request.json
        params = request.args

        if 'username' in params:
            username = params['username']
            if 'old_password' and 'new_password' in data:
                old_password = data['old_password']
                new_password = data['new_password']
                try:
                    user = db.users.find_one({"username": username})
                except Exception as e:
                    abort(500, error=str(e))
                else:
                    if user:

                        if verify_password(old_password, user['password']):
                            update = {
                                "$set": {"password": hash_password(new_password), "last_updated": dt.datetime.now()}}
                            try:
                                user = db.users.update_one({"username": username}, update)
                            except Exception as e:
                                abort(500, error=str(e))
                            else:
                                if user.matched_count == 1:
                                    return jsonify({'success': 'Password updated successfully'})
                                else:
                                    abort(404, error="User not found")
                        else:
                            abort(400, error="Old password is incorrect")
                    else:
                        abort(404, error="User not found")

        else:
            abort(400, error="An error occurred. Provide username parameter.")


class UserForgotPassword(Resource):
    def put(self):
        data = request.json['new_password']
        params = request.args

        if 'username' in params:
            username = params['username']
            try:
                user = db.users.find_one({"username": username})
            except Exception as e:
                abort(500, error=str(e))
            else:
                if user:
                    update = {"$set": {"password": hash_password(data), "last_updated": dt.datetime.now()}}
                    try:
                        user = db.users.update_one({"username": username}, update)
                    except Exception as e:
                        abort(500, error=str(e))
                    else:
                        if user.matched_count == 1:
                            return jsonify({'success': 'Password updated successfully'})
                        else:
                            abort(404, error="User not found")
                else:
                    abort(404, error="User not found")
