from typing import Optional
from sqlmodel import SQLModel, Field
from app.models.base import TimestampedModel


class User(TimestampedModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True, max_length=150, nullable=False)
    hashed_password: str = Field(max_length=255, nullable=False)
    full_name: str = Field(default="Rida Optical Administrator", max_length=150)
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
    role: str = Field(default="admin", max_length=50)
