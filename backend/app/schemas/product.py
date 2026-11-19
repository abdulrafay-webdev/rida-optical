from typing import Optional, List
from pydantic import BaseModel, Field


class ProductImageSchema(BaseModel):
    id: int
    title: str
    relative_path: str
    url: str
    alt_text: str = ""
    file_exists_on_disk: bool = True


class VariationColorSchema(BaseModel):
    term_id: Optional[int] = None
    name: str
    slug: str
    hex_code: Optional[str] = None


class ProductVariationSchema(BaseModel):
    variation_id: int
    title: str
    slug: str
    sku: str
    color: VariationColorSchema
    size: str = "Standard"
    price_pkr: float
    regular_price_pkr: Optional[float] = None
    sale_price_pkr: Optional[float] = None
    stock_status: str = "instock"
    image: Optional[ProductImageSchema] = None


class CategoryRefSchema(BaseModel):
    id: int
    name: str
    slug: str


class ProductSEOSchema(BaseModel):
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    canonical_url: Optional[str] = None


class ProductListItemSchema(BaseModel):
    id: int
    title: str
    slug: str
    sku: str
    base_price_pkr: float
    regular_price_pkr: Optional[float] = None
    sale_price_pkr: Optional[float] = None
    stock_status: str
    is_featured: bool = False
    primary_category: Optional[CategoryRefSchema] = None
    has_prescription_support: bool = True
    primary_image: ProductImageSchema
    variations_count: int = 0
    available_colors: List[VariationColorSchema] = []


class ProductDetailSchema(BaseModel):
    id: int
    title: str
    slug: str
    sku: str
    base_price_pkr: float
    regular_price_pkr: Optional[float] = None
    sale_price_pkr: Optional[float] = None
    stock_status: str
    is_featured: bool
    total_sales: int = 0
    short_description: str = ""
    description: str = ""
    primary_category: Optional[CategoryRefSchema] = None
    all_categories: List[CategoryRefSchema] = []
    has_prescription_support: bool
    primary_image: ProductImageSchema
    gallery_images: List[ProductImageSchema] = []
    variations_count: int
    variations: List[ProductVariationSchema] = []
    seo: Optional[ProductSEOSchema] = None


class ProductFilterQuery(BaseModel):
    category: Optional[str] = None
    q: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    color: Optional[str] = None
    in_stock_only: bool = False
    has_prescription: Optional[bool] = None
    sort_by: Optional[str] = Field(default="featured", pattern="^(featured|price_asc|price_desc|title_asc)$")
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=20, ge=1, le=100)


class AdminVariationCreate(BaseModel):
    color_name: str
    color_hex: Optional[str] = "#000000"
    price_pkr: Optional[float] = None
    sku: Optional[str] = None
    image_url: Optional[str] = None


class AdminProductCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    slug: Optional[str] = None
    sku: Optional[str] = None
    base_price_pkr: float = Field(..., gt=0)
    regular_price_pkr: Optional[float] = None
    sale_price_pkr: Optional[float] = None
    category_id: Optional[int] = None
    category_slug: Optional[str] = None
    stock_status: str = Field(default="instock")
    is_featured: bool = False
    has_prescription_support: bool = True
    short_description: Optional[str] = ""
    description: Optional[str] = ""
    primary_image_url: Optional[str] = None
    gallery_image_urls: Optional[List[str]] = []
    variations: Optional[List[AdminVariationCreate]] = []


class AdminProductUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    sku: Optional[str] = None
    base_price_pkr: Optional[float] = None
    regular_price_pkr: Optional[float] = None
    sale_price_pkr: Optional[float] = None
    category_id: Optional[int] = None
    category_slug: Optional[str] = None
    stock_status: Optional[str] = None
    is_featured: Optional[bool] = None
    has_prescription_support: Optional[bool] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    primary_image_url: Optional[str] = None
    gallery_image_urls: Optional[List[str]] = None
    variations: Optional[List[AdminVariationCreate]] = None

