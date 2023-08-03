import config
import ebooklib
import os

from bs4 import BeautifulSoup
from ebooklib import epub
from flask import Flask, make_response, jsonify
from flask import request
from flask_cors import CORS
from werkzeug.utils import secure_filename

from sql_transmitter import transmit_book
from chapter_finder import Book

app = Flask(__name__)

# CORS
CORS(app, origins=config.CORS_ORIGINS)
app.config["CORS_HEADERS"] = 'Content-Type'


# Helpers
def send_response(message, status_code, severity=None):
    print(f">> {message}")

    response = make_response(
        jsonify(
            {"message": str(message), "severity": severity}
        ),
        status_code,
    )
    return response

def remove_file_from_storage(path):
    os.remove(path)
    print(">> File was removed from directory")

# Routes
@app.route("/", methods=["GET"])
def hello_word():
    return "<h1>Peaches for free?</h1>"

@app.route("/books", methods = ["POST"])
def add_book():
    if request.method == 'POST':
        F = request.files.get("file")

        if F.content_type in config.ALLOWED_TYPES:
            path_to_file = os.path.join(
                os.path.dirname(__file__),
                "saved_books",
                secure_filename(F.filename)
            )
            F.save(path_to_file)
            book = Book(path_to_file,False,False)
            transmit_book(book)
            remove_file_from_storage(path_to_file)
        else:
            return send_response("File type not allowed", 500, "danger")

    return send_response("Book added to database.", 200)