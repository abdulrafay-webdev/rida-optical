from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from app.models.base import TimestampedModel

if TYPE_CHECKING:
    from app.models.product import Product


class ProductCategoryLink(SQLModel, table=True):
    __tablename__ = "product_category_links"

    product_id: int = Field(foreign_key="products.id", primary_key=True)
    category_id: int = Field(foreign_key="categories.id", primary_key=True)
    is_primary: bool = Field(default=False)


class Category(TimestampedModel, table=True):
    __tablename__ = "categories"

    id: int = Field(default=None, primary_key=True, description="Original WordPress Term ID")
    name: str = Field(index=True, max_length=150, nullable=False)
    slug: str = Field(unique=True, index=True, max_length=150, nullable=False)
    description: Optional[str] = Field(default=None)
    parent_id: Optional[int] = Field(default=None, foreign_key="categories.id", index=True)
    product_count: int = Field(default=0)
    thumbnail_id: Optional[int] = Field(default=None)
    is_active: bool = Field(default=True)

    # Self-referential hierarchy
    parent: Optional["Category"] = Relationship(
        back_populates="children",
        sa_relationship_kwargs={"remote_side": "Category.id"},
    )
    children: List["Category"] = Relationship(back_populates="parent")

    # Many-to-many relationship with products
    products: List["Product"] = Relationship(
        back_populates="categories",
        link_model=ProductCategoryLink,
    )
