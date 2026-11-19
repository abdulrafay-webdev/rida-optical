import sys
from pathlib import Path

# Ensure root directory is in sys.path so 'app' package is always resolvable
_ROOT_DIR = Path(__file__).resolve().parent.parent
if str(_ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(_ROOT_DIR))

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.api.v1.router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Modern REST API for Rida Optical e-commerce platform. Powers optical frames catalog, WAPF lens selector, Cash on Delivery checkout, and WhatsApp order routing.",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# CORS Middleware
# Allows localhost frontend, production domain, and Vercel preview deployments
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=r"^https:\/\/.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
# Mount under /api/v1 as canonical path, and also /api for convenience
app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(api_router, prefix="/api")


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)


@app.get("/", summary="Root API Information")
@app.get("/api/index", summary="Root API Information (Vercel rewrite alias)", include_in_schema=False)
async def root():
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs",
        "redoc": "/redoc",
        "health": "/api/v1/health",
        "endpoints": {
            "products": "/api/v1/products",
            "featured_products": "/api/v1/products/featured",
            "categories": "/api/v1/categories",
            "optical_options": "/api/v1/optical/options",
            "search": "/api/v1/search?q={term}",
            "orders": "/api/v1/orders",
        },
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
