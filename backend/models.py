from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base
import uuid


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    cart_items = relationship("CartItem", back_populates="user", cascade="all, delete-orphan")
    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")


class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    product_id = Column(String, nullable=False)
    quantity = Column(Integer, default=1, nullable=False)
    added_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="cart_items")


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)
    is_vegetarian = Column(Boolean, default=False)
    is_vegan = Column(Boolean, default=False)
    is_high_protein = Column(Boolean, default=False)
    budget_preference = Column(Integer, default=500)
    favorite_categories = Column(Text, default="[]")

    user = relationship("User", back_populates="profile")
