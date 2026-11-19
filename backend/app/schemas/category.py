from typing import Optional, List
from pydantic import BaseModel


class CategoryCreate(BaseModel):
    name: str
    slug: Optional[str] = None
    parent_id: Optional[int] = None
    description: Optional[str] = None


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    parent_id: Optional[int] = None
    description: Optional[str] = None


class CategoryBaseSchema(BaseModel):
    id: int
    name: str
    slug: str
    parent_id: Optional[int] = None
    product_count: int = 0
    thumbnail_id: Optional[int] = None
    description: Optional[str] = None


class CategorySchema(CategoryBaseSchema):
    pass


class CategoryTreeSchema(CategoryBaseSchema):
    children: List["CategoryTreeSchema"] = []


CategoryTreeSchema.model_rebuild()
