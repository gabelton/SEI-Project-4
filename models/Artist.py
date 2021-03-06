from app import db
from pony.orm import Required, Optional, Set
from marshmallow import Schema, fields


class Artist(db.Entity):
    name = Required(str)
    image = Optional(str)
    description = Optional(str)
    dob = Optional(str)
    dod = Optional(str)
    events = Set('Event')


class ArtistSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    image = fields.Str()
    description = fields.Str()
    dob = fields.Str()
    dob = fields.Str()
    dod = fields.Str()
    events = fields.Nested('EventSchema', many=True, exclude=('keywords', 'artists', 'user'))
