from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class Kontakt(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(100), nullable=False)
    surname=db.Column(db.String(100), nullable=False)
    role=db.Column(db.String(50), nullable=False)
    gender=db.Column(db.String(50), nullable=False)
    description=db.Column(db.Text, nullable=True)
    email=db.Column(db.String(100), nullable=False)
    img_url=db.Column(db.String(200), nullable=True)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "surname":self.surname,
            "role":self.role,
            "gender":self.gender,
            "description":self.description,
            "email":self.email,
            "imgUrl":self.img_url
        }

class User(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    user_name=db.Column(db.String(100), unique=True, nullable=False)
    password_hash=db.Column(db.String(200), nullable=False)
    contacts=db.relationship('Kontakt', backref='user', lazy=True, cascade="all, delete-orphan")

    def set_password(self,password):
        self.password_hash=generate_password_hash(password)

    def check_password(self,password):
        return check_password_hash(self.password_hash, password)
        
