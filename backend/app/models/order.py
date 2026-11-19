from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from app.models.base import TimestampedModel


class Customer(TimestampedModel, table=True):
    __tablename__ = "customers"

    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str = Field(index=True, max_length=150, nullable=False)
    phone: str = Field(index=True, max_length=50, nullable=False)
    alternate_phone: Optional[str] = Field(default=None, max_length=50)
    email: Optional[str] = Field(default=None, max_length=150, index=True)
    address: str = Field(max_length=500, nullable=False)
    city: str = Field(index=True, max_length=100, nullable=False)
    postal_code: Optional[str] = Field(default=None, max_length=20)

    orders: List["Order"] = Relationship(back_populates="customer")


class Order(TimestampedModel, table=True):
    __tablename__ = "orders"

    id: Optional[int] = Field(default=None, primary_key=True)
    order_number: str = Field(unique=True, index=True, max_length=50, nullable=False)
    customer_id: int = Field(foreign_key="customers.id", index=True, nullable=False)
    status: str = Field(default="pending", index=True, max_length=50)
    payment_method: str = Field(default="cod", max_length=50)
    payment_status: str = Field(default="unpaid", max_length=50)
    subtotal_pkr: float = Field(nullable=False)
    shipping_fee_pkr: float = Field(default=349.0)
    discount_pkr: float = Field(default=0.0)
    total_amount_pkr: float = Field(nullable=False)
    shipping_address: str = Field(max_length=500, nullable=False)
    shipping_city: str = Field(max_length=100, nullable=False)
    order_notes: Optional[str] = Field(default=None)
    tracking_number: Optional[str] = Field(default=None, max_length=100)
    courier_name: Optional[str] = Field(default=None, max_length=100)

    customer: Customer = Relationship(back_populates="orders")
    items: List["OrderItem"] = Relationship(
        back_populates="order",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )


class OrderItem(TimestampedModel, table=True):
    __tablename__ = "order_items"

    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: int = Field(foreign_key="orders.id", index=True, nullable=False)
    product_id: int = Field(foreign_key="products.id", index=True, nullable=False)
    variation_id: Optional[int] = Field(default=None, foreign_key="product_variations.id")
    product_title: str = Field(max_length=255, nullable=False)
    variation_title: Optional[str] = Field(default=None, max_length=100)
    unit_frame_price: float = Field(nullable=False)
    quantity: int = Field(default=1, nullable=False)
    line_total: float = Field(nullable=False)

    # Optical Prescription Additions
    has_prescription: bool = Field(default=False)
    lens_usage_id: Optional[str] = Field(default=None, foreign_key="lens_usage_types.id")
    lens_coating_id: Optional[str] = Field(default=None, foreign_key="lens_coatings.id")
    optical_surcharge: float = Field(default=0.0)
    prescription_text: Optional[str] = Field(default=None)
    prescription_file_url: Optional[str] = Field(default=None, max_length=500)
    pd_measurement: Optional[str] = Field(default=None, max_length=20)
    sph_od: Optional[str] = Field(default=None, max_length=20)
    cyl_od: Optional[str] = Field(default=None, max_length=20)
    axis_od: Optional[str] = Field(default=None, max_length=20)
    sph_os: Optional[str] = Field(default=None, max_length=20)
    cyl_os: Optional[str] = Field(default=None, max_length=20)
    axis_os: Optional[str] = Field(default=None, max_length=20)

    order: Order = Relationship(back_populates="items")
