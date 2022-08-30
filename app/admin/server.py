from importlib.resources import path
from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import os
from chapter_finder import Book
from sql_transmitter import transmit_book


ALLOWED_TYPES = ["application/pdf","application/epub+zip","application/epub"]
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins":"*"}})
app.config["CORS_HEADERS"] = 'Content-Type'

@app.route("/books",methods = ["POST","OPTION"],)
def do_something():
    if request.method == 'POST':
        F = request.files.get("file")
        if(F.content_type in ALLOWED_TYPES):
            path_to_file = os.path.join(os.path.dirname(__file__),"saved_books",F.filename)
            F.save(path_to_file)
            book = Book(path_to_file,False,False)
            transmit_book(book)

        else:
            print("ERROR")
    if request.method =="OPTION":
        return "OK"
    return "<p>Hello, World!</p>"