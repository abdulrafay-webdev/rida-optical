from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr
from app.schemas.optical import OpticalSelectionPayload


class CustomerInfoCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=7, max_length=25)
    alternate_phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: str = Field(..., min_length=5, max_length=300)
    city: str = Field(..., min_length=2, max_length=50)
    postal_code: Optional[str] = None
    order_notes: Optional[str] = None


class OrderItemCreate(BaseModel):
    product_id: int
    variation_id: Optional[int] = None
    quantity: int = Field(default=1, ge=1)
    optical_selection: Optional[OpticalSelectionPayload] = None


class OrderCreate(BaseModel):
    customer: CustomerInfoCreate
    items: List[OrderItemCreate] = Field(..., min_length=1)
    payment_method: str = Field(default="cod", pattern="^(cod|whatsapp)$")
    coupon_code: Optional[str] = None


class OrderItemDetail(BaseModel):
    product_id: int
    product_title: str
    variation_id: Optional[int] = None
    variation_title: Optional[str] = None
    unit_frame_price: float
    optical_surcharge: float
    unit_total_price: float
    quantity: int
    line_total: float
    optical_details: Optional[dict] = None


class OrderResponse(BaseModel):
    order_id: str
    created_at: str
    status: str = "pending"
    payment_method: str = "cod"
    customer: CustomerInfoCreate
    items: List[OrderItemDetail]
    subtotal_pkr: float
    shipping_fee_pkr: float
    discount_pkr: float = 0.0
    total_amount_pkr: float
    whatsapp_url: str
    tracking_note: str
