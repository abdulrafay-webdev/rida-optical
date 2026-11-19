from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from app.models.base import TimestampedModel

if TYPE_CHECKING:
    from app.models.product import Product


class ProductImageLink(SQLModel, table=True):
    __tablename__ = "product_image_links"

    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int = Field(foreign_key="products.id", index=True, nullable=False)
    media_asset_id: int = Field(foreign_key="media_assets.id", index=True, nullable=False)
    is_primary: bool = Field(default=False)
    display_order: int = Field(default=0)


class MediaAsset(TimestampedModel, table=True):
    __tablename__ = "media_assets"

    id: int = Field(default=None, primary_key=True, description="Original WordPress Attachment ID")
    title: str = Field(default="", max_length=255)
    file_path: str = Field(max_length=500, nullable=False, description="Relative uploads path e.g. 2025/07/frame.jpg")
    original_url: str = Field(max_length=500, nullable=False)
    imagekit_url: Optional[str] = Field(default=None, max_length=500)
    alt_text: str = Field(default="", max_length=255)
    mime_type: str = Field(default="image/jpeg", max_length=100)
    width: Optional[int] = Field(default=None)
    height: Optional[int] = Field(default=None)
    file_size_bytes: Optional[int] = Field(default=None)
