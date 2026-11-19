from fastapi import APIRouter
from app.schemas.coupon import CouponValidateRequest, CouponValidateResponse

router = APIRouter()

ACTIVE_COUPONS = {
    "OFF10": {
        "discount_percent": 10.0,
        "description": "10% promotional discount on optical orders.",
        "min_subtotal": 1000.0,
    },
    "RIDA10": {
        "discount_percent": 10.0,
        "description": "10% welcome discount for new optical customers.",
        "min_subtotal": 1500.0,
    },
}


@router.post("/validate", response_model=CouponValidateResponse, summary="Validate discount coupon code")
async def validate_coupon(coupon_in: CouponValidateRequest):
    code = coupon_in.code.strip().upper()
    subtotal = coupon_in.subtotal

    if code not in ACTIVE_COUPONS:
        return CouponValidateResponse(
            valid=False,
            code=code,
            discount_percent=0.0,
            discount_amount_pkr=0.0,
            new_subtotal_pkr=subtotal,
            message=f"Coupon code '{code}' is invalid or expired.",
        )

    promo = ACTIVE_COUPONS[code]
    if subtotal < promo["min_subtotal"]:
        return CouponValidateResponse(
            valid=False,
            code=code,
            discount_percent=0.0,
            discount_amount_pkr=0.0,
            new_subtotal_pkr=subtotal,
            message=f"Coupon '{code}' requires a minimum subtotal of Rs. {int(promo['min_subtotal']):,}.",
        )

    percent = promo["discount_percent"]
    discount_amount = round((subtotal * percent) / 100.0, 2)
    new_subtotal = max(0.0, subtotal - discount_amount)

    return CouponValidateResponse(
        valid=True,
        code=code,
        discount_percent=percent,
        discount_amount_pkr=discount_amount,
        new_subtotal_pkr=new_subtotal,
        message=f"Success! {int(percent)}% discount applied ({promo['description']}).",
    )
