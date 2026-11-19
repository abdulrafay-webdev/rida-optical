from typing import Optional
from pydantic import BaseModel, Field


class ReviewCreate(BaseModel):
    customer_name: str = Field(..., min_length=2, max_length=150)
    city: Optional[str] = Field(default="Pakistan")
    rating: int = Field(default=5, ge=1, le=5)
    image_url: str = Field(..., min_length=5)
    comment: Optional[str] = ""
    product_name: Optional[str] = ""


class ReviewSchema(ReviewCreate):
    id: int
    created_at: str
