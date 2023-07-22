import os
from dotenv import load_dotenv
load_dotenv()

ALLOWED_TYPES = [
    "application/epub+zip",
    "application/epub"
]

CORS_ORIGINS = [
    "http://localhost:8080", 
    "http://localhost:5173", 
    "https://knowledge-club.herokuapp.com",
    "http://www.yedia.io",
    "https://www.yedia.io"
]

DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")