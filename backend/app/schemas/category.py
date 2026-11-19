from typing import Optional, List
from pydantic import BaseModel


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
