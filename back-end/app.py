from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

load_dotenv()

app=Flask(__name__)
CORS(app, resources={r"/*":{"origins":"http://localhost:5174"}})

app.config["SQLALCHEMY_DATABASE_URI"]=os.getenv("SQLALCHEMY_DATABASE_URI", "sqlite:///kontakty.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
app.config["JWT_SECRET_KEY"]= os.getenv("JWT_SECRET_KEY")

db=SQLAlchemy(app)
jwt=JWTManager(app)


import routes

with app.app_context():
    db.create_all()

if __name__=="__main__":
    app.run(debug=True)

