import os
import requests
from app import db
from pony.orm import Required, Optional, Set
from marshmallow import Schema, fields, post_load
from .Keyword import Keyword
from .Artist import Artist

def geolocate(record):
    params = {
        'q': record.venue,
        'key': os.getenv('OPENCAGE_KEY')
    }
    res = requests.get('https://api.opencagedata.com/geocode/v1/json', params)
    json = res.json()

    record.lat = json['results'][0]['geometry']['lat']
    record.lng = json['results'][0]['geometry']['lng']






class Event(db.Entity):
    name = Required(str)
    start_date = Required(str)
    end_date = Required(str)
    venue = Required(str)
    area = Required(str)
    entry_fee = Required(float)
    concession_fee = Optional(float)
    lat = Optional(float)
    lng = Optional(float)
    image = Optional(str)
    artists = Set('Artist')
    user = Required('User')
    keywords = Set('Keyword')

    def before_insert(self):
        geolocate(self)

    def before_update(self):
        geolocate(self)



class EventSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    start_date = fields.Str(required=True)
    end_date = fields.Str(required=True)
    venue = fields.Str(required=True)
    area = fields.Str(required=True)
    entry_fee = fields.Float(required=True)
    concession_fee = fields.Float()
    lat = fields.Float(dump_only=True)
    lng = fields.Float(dump_only=True)
    image = fields.Str()
    artists = fields.Nested('ArtistSchema', many=True, exclude=('events', ), dump_only=True)
    keywords = fields.Nested('KeywordSchema', many=True, exclude=('events', 'users',), dump_only=True)
    keyword_ids = fields.List(fields.Int(), load_only=True)
    user = fields.Nested('UserSchema', exclude=('events', 'email', 'keywords'), dump_only=True)


    @post_load
    def load_keywords(self, data):
        data['keywords'] = [Keyword.get(id=keyword_id) for keyword_id in data['keyword_ids']]
        del data['keyword_ids']

        return data
