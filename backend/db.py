import pymongo
from dotenv import load_dotenv
import os

load_dotenv()

client = pymongo.MongoClient(os.getenv('MONGO_URI'))

db = client['ai_hub']
