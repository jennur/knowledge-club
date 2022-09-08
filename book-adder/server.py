from importlib.resources import path
from flask import Flask, make_response, jsonify
from flask import request
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from waitress import serve
import os
from chapter_finder import Book
from sql_transmitter import transmit_book


ALLOWED_TYPES = ["application/pdf","application/epub+zip","application/epub"]
app = Flask(__name__)
CORS(app, origins=["http://localhost:8080", "http://localhost:5173", "https://knowledge-club.herokuapp.com"])
app.config["CORS_HEADERS"] = 'Content-Type'

@app.route("/", methods=["GET"])
def hello_word():
    return "<h1>Peaches for free?</h1>"

@app.route("/books",methods = ["POST","OPTION"])
def do_something():
    if request.method == 'POST':
        F = request.files.get("file")
        if(F.content_type in ALLOWED_TYPES):
            path_to_file = os.path.join(os.path.dirname(__file__),"saved_books",secure_filename(F.filename))
            print("Path to file:", path_to_file)
            F.save(path_to_file)
            book = Book(path_to_file,False,False)
            transmit_book(book)

        else:
            message = "File type not allowed"
            print(f">> {message}")
            response = make_response(jsonify(
                    {"message": str(message), "severity": "danger"}
                ),
                401,
            )
            return response

    if request.method =="OPTION":
        return "OK"
    return "<p>Hello, World!</p>"