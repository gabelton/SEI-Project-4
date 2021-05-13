from flask import Flask
from pony.orm import Database
from config.environment import db_uri
app = Flask(__name__, static_folder='public', static_url_path='')
db = Database()
db.bind('postgres', db_uri)
# from models.Event import Event
# from models.User import User
# from models.Keyword import Keyword


from config import routes


db.generate_mapping(create_tables=True)
