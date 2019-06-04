import os
from app import app

from controllers import auth, events, keywords, artists, contacts


app.register_blueprint(auth.router, url_prefix='/api')
app.register_blueprint(events.router, url_prefix='/api')
app.register_blueprint(keywords.router, url_prefix='/api')
app.register_blueprint(artists.router, url_prefix='/api')
app.register_blueprint(contacts.router, url_prefix='/api')

@app.route('/', defaults={'path': ''}) # homepage
@app.route('/<path:path>') # any other path
def catch_all(path='index.html'):

    if os.path.isfile('public/' + path): # if path is a file, send it back
        return app.send_static_file(path)

    return app.send_static_file('index.html')
