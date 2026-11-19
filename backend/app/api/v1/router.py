from fastapi import APIRouter
from app.api.v1.endpoints import (
    health,
    products,
    categories,
    optical,
    orders,
    search,
    auth,
    coupons,
    admin_orders,
    admin_products,
)

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
api_router.include_router(categories.router, prefix="/categories", tags=["Categories"])
api_router.include_router(optical.router, prefix="/optical", tags=["Optical Lens Configuration"])
api_router.include_router(orders.router, prefix="/orders", tags=["Orders & Checkout"])
api_router.include_router(search.router, prefix="/search", tags=["Catalog Search"])
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(coupons.router, prefix="/coupons", tags=["Promotions & Coupons"])
api_router.include_router(admin_orders.router, prefix="/admin", tags=["Admin Orders"])
api_router.include_router(admin_products.router, prefix="/admin/products", tags=["Admin Products"])


