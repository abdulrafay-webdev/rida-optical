from pydantic import BaseModel, Field


class CouponValidateRequest(BaseModel):
    code: str = Field(..., min_length=1, max_length=50)
    subtotal: float = Field(..., ge=0)


class CouponValidateResponse(BaseModel):
    valid: bool
    code: str
    discount_percent: float = 0.0
    discount_amount_pkr: float = 0.0
    new_subtotal_pkr: float
    message: str
