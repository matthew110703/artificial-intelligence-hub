from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS

from resources.register import Register
from resources.login import Login
from resources.user import User, UserResetPassword, UserForgotPassword

app = Flask(__name__)
CORS(app)
api = Api(app)


class CheckStatus(Resource):
    def get(self):
        return {'status': 'active'}


api.add_resource(CheckStatus, '/')
api.add_resource(Register, '/api/register')
api.add_resource(Login, '/api/login')
api.add_resource(User, '/api/user')
api.add_resource(UserResetPassword, '/api/user/reset-password')
api.add_resource(UserForgotPassword, '/api/user/forgot-password')

if __name__ == "__main__":
    # port = int(os.environ.get("PORT", 5000))
    # app.run(host="0.0.0.0", port=port)
    app.run()
