from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from app.models.base import TimestampedModel
from app.models.category import ProductCategoryLink

if TYPE_CHECKING:
    from app.models.category import Category
    from app.models.image import MediaAsset


class ProductVariation(TimestampedModel, table=True):
    __tablename__ = "product_variations"

    id: int = Field(default=None, primary_key=True, description="Original WordPress Variation Post ID")
    product_id: int = Field(foreign_key="products.id", index=True, nullable=False)
    title: str = Field(max_length=255, nullable=False)
    slug: str = Field(max_length=255, nullable=False)
    sku: str = Field(unique=True, index=True, max_length=100, nullable=False)
    color_name: str = Field(index=True, max_length=100, nullable=False)
    color_slug: str = Field(max_length=100, nullable=False)
    color_hex: Optional[str] = Field(default=None, max_length=20)
    size: str = Field(default="Standard", max_length=50)
    price_pkr: float = Field(nullable=False)
    regular_price_pkr: Optional[float] = Field(default=None)
    sale_price_pkr: Optional[float] = Field(default=None)
    stock_status: str = Field(default="instock", max_length=50)
    image_id: Optional[int] = Field(default=None, foreign_key="media_assets.id")

    product: "Product" = Relationship(back_populates="variations")
    image: Optional["MediaAsset"] = Relationship()


class Product(TimestampedModel, table=True):
    __tablename__ = "products"

    id: int = Field(default=None, primary_key=True, description="Original WordPress Post ID")
    title: str = Field(index=True, max_length=255, nullable=False)
    slug: str = Field(unique=True, index=True, max_length=255, nullable=False)
    sku: str = Field(unique=True, index=True, max_length=100, nullable=False)
    base_price_pkr: float = Field(nullable=False, index=True)
    regular_price_pkr: Optional[float] = Field(default=None)
    sale_price_pkr: Optional[float] = Field(default=None)
    stock_status: str = Field(default="instock", max_length=50, index=True)
    is_featured: bool = Field(default=False, index=True)
    total_sales: int = Field(default=0)
    short_description: str = Field(default="")
    description: str = Field(default="")
    has_prescription_support: bool = Field(default=True, index=True)
    primary_image_id: Optional[int] = Field(default=None, foreign_key="media_assets.id")

    # SEO Metadata
    meta_title: Optional[str] = Field(default=None, max_length=255)
    meta_description: Optional[str] = Field(default=None, max_length=500)
    canonical_url: Optional[str] = Field(default=None, max_length=500)

    # Relationships
    primary_image: Optional["MediaAsset"] = Relationship()
    categories: List["Category"] = Relationship(
        back_populates="products",
        link_model=ProductCategoryLink,
    )
    variations: List[ProductVariation] = Relationship(
        back_populates="product",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )
