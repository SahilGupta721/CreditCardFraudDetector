from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

connection_string = os.getenv("MONGO_URI")

client = MongoClient(connection_string, serverSelectionTimeoutMS=3000)
database=client['creditcard-fraud-detection']
database_transaction_raw=database['transaction_raw']
database_transaction_pred=database['transaction_pred']

def db_connect():
    try:
        client.admin.command('ping')
        print('Connected to MongoDB==>')
    except Exception as error:
        print(f"Error: {error}")
db_connect()