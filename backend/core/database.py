from pymongo import MongoClient
connection_string='mongodb+srv://sahilgupta70500_db_user:jpZvZQgXtV6bQeId@cluster0.f7y8olo.mongodb.net/?appName=Cluster0'

client=MongoClient(connection_string,serverSelectiontimeoutMS=3000)
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