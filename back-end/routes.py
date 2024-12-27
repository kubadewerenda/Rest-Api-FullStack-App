from app import app,db
from flask import request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from models import Kontakt, User

#Użytkownicy========================================================================
@app.route("/api/register",methods=["POST"])
def register():
    try:
        data=request.json
        user_name=data.get("user_name")
        password=data.get("password_hash")

        if not password or not user_name:
            return jsonify({"error":"Hasło i nazwa użytkownika wymagana."}), 400
        
        existing_user=User.query.filter_by(user_name=user_name).first()
        if existing_user:
            return jsonify({"error":"Podany użytkownik już istnieje."}), 400
        
        if len(password)<5:
            return jsonify({"error":"Hasło musi mieć więcej niż 5 znaków."}), 400
        
        new_user=User(user_name=user_name)
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg":"Użytkownik stworzony poprawnie."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500

@app.route("/api/login",methods=["POST"])
def login():
    try:
        data=request.json
        user_name=data.get("user_name")
        password=data.get("password_hash")

        user=User.query.filter_by(user_name=user_name).first()
        if not user or not user.check_password(password):
            return jsonify({"error":"Sprawdź swoje dane."}),401
        
        access_token=create_access_token(identity=user_name)
        return ({"access_token":access_token}), 200
    except Exception as e:
        return jsonify({"error":str(e)})

#Get wszystkie kontakty
@app.route("/api/kontakty",methods=["GET"])
@jwt_required()
def get_kontakty():
    try:
        current_user=get_jwt_identity()
        user=User.query.filter_by(user_name=current_user).first()

        if not user:
            return jsonify({"error":"Użytkownik nie znaleziony."}), 404
        
        kontakty=Kontakt.query.filter_by(user_id=user.id).all()
        result=[kontakt.to_json() for kontakt in kontakty]

        return jsonify(result)
    except Exception as e:
        return jsonify({"error":str(e)})

@app.route("/api/kontakty",methods=["POST"])
@jwt_required()
def create_kontakt():
    try:
        current_user=get_jwt_identity()
        user=User.query.filter_by(user_name=current_user).first()

        if not user:
            return jsonify({"error":"Użytkownik nie znaleziony."}), 404

        data=request.json

        #walidacja
        requierd_fields=["name","surname","role","gender","email"]
        for field in requierd_fields:
            if field not in data or not data.get(field):
                return jsonify({"error":f"Brak wymaganego pola:{field}."}), 400          
        
        name=data.get("name")
        surname=data.get("surname")
        role=data.get("role")
        gender=data.get("gender")
        description=data.get("description")
        email=data.get("email")
       
        #Avatar randomowy
        if gender=="male":
            img_url=f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender=="female":
            img_url=f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url=None

        new_kontakt=Kontakt(name=name,surname=surname,role=role,gender=gender,description=description,email=email,img_url=img_url,user_id=user.id)

        db.session.add(new_kontakt)
        db.session.commit()

        return jsonify(new_kontakt.to_json()), 201    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    
@app.route("/api/kontakty/<int:id>",methods=["DELETE"])
@jwt_required()
def delete_kontakt(id):
    try:
        current_user=get_jwt_identity()
        user=User.query.filter_by(user_name=current_user).first()

        if not user:
            return jsonify({"msg":"Użytkownik nie znaleziony."}), 404
        
        kontakt=Kontakt.query.filter_by(id=id, user_id=user.id).first()

        if kontakt is None:
            return jsonify({"error":"Nie ma takiego kontaktu."}), 404
        
        db.session.delete(kontakt)
        db.session.commit()

        return jsonify({"msg":"Kontakt usunięty."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500

@app.route("/api/kontakty/<int:id>",methods=["PATCH"])
@jwt_required()
def update_kontakt(id):
    try:
        current_user=get_jwt_identity()
        user=User.query.filter_by(user_name=current_user).first()

        if not user:
            return jsonify({"msg":"Użytkownik nie znaleziony."}), 404

        kontakt=Kontakt.query.filter_by(id=id, user_id=user.id).first()

        if kontakt is None:
            return jsonify({"error":"Nie ma takiego kontaktu."}), 404

        data=request.json

        kontakt.name=data.get("name",kontakt.name)
        kontakt.surname=data.get("surname",kontakt.surname)
        kontakt.role=data.get("role",kontakt.role)
        kontakt.gender=data.get("gender",kontakt.gender)
        kontakt.description=data.get("description",kontakt.description)
        kontakt.email=data.get("email",kontakt.email)

        #walidacja
        requierd_fields=["name","surname","role","email"]
        for field in requierd_fields:
            if field not in data or not data.get(field):
                return jsonify({"error":f"Brak wymaganego pola:{field}."}), 400

        db.session.commit()

        return jsonify(kontakt.to_json()), 200        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500

