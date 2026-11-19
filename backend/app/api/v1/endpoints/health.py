import os
from fastapi import APIRouter
from app.core.config import settings
from app.data.loader import repo

router = APIRouter()


@router.get("/health", summary="System Health Check")
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "catalog": {
            "products_loaded": len(repo._products),
            "categories_loaded": len(repo._categories),
            "lens_coatings_loaded": len(repo._coatings_by_id),
            "optical_usage_types_loaded": len(repo._usage_by_id),
        },
    }
