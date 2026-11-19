from typing import Optional
from sqlmodel import SQLModel, Field
from app.models.base import TimestampedModel


class LensUsageType(TimestampedModel, table=True):
    __tablename__ = "lens_usage_types"

    id: str = Field(primary_key=True, max_length=50, description="Slug ID: single-vision, progressive, etc.")
    name: str = Field(max_length=100, nullable=False)
    slug: str = Field(unique=True, index=True, max_length=100, nullable=False)
    description: Optional[str] = Field(default=None)
    price_modifier_pkr: float = Field(default=0.0)
    is_default: bool = Field(default=False)
    display_order: int = Field(default=0)


class LensCoating(TimestampedModel, table=True):
    __tablename__ = "lens_coatings"

    id: str = Field(primary_key=True, max_length=50, description="Slug ID: screen-standard, transition-premium, etc.")
    name: str = Field(max_length=150, nullable=False)
    slug: str = Field(unique=True, index=True, max_length=150, nullable=False)
    category: str = Field(index=True, max_length=50, description="clear, blue_cut, photochromic, driving, etc.")
    price_pkr: float = Field(nullable=False)
    description: Optional[str] = Field(default=None)
    display_order: int = Field(default=0)
    is_active: bool = Field(default=True)
