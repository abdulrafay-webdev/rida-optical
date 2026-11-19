import sys
import traceback
from pathlib import Path
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse

# Ensure root directory is in sys.path so 'app' package is always resolvable
_ROOT_DIR = Path(__file__).resolve().parent.parent
if str(_ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(_ROOT_DIR))

try:
    from fastapi.middleware.cors import CORSMiddleware
    from app.core.config import settings
    from app.api.v1.router import api_router

    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description="Modern REST API for Rida Optical e-commerce platform.",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_origin_regex=r"^https:\/\/.*\.vercel\.app$",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix=settings.API_V1_STR)
    app.include_router(api_router, prefix="/api")

    @app.get("/favicon.ico", include_in_schema=False)
    async def favicon():
        return Response(status_code=204)

    @app.get("/debug-trace", response_class=Response)
    async def debug_trace():
        return Response(content="APP_LOADED_SUCCESSFULLY", media_type="text/plain")

    @app.get("/", summary="Root API Information")
    @app.get("/api/index", summary="Root API Information", include_in_schema=False)
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

except Exception as exc:
    err_tb = traceback.format_exc()
    print("CRITICAL STARTUP ERROR IN APP.MAIN:", err_tb, file=sys.stderr)

    app = FastAPI(title="Rida Optical API - Startup Diagnostics")

    @app.get("/debug-trace")
    async def debug_trace_fallback():
        return Response(content=f"STARTUP EXCEPTION:\n{err_tb}", media_type="text/plain", status_code=200)

    @app.get("/favicon.ico", include_in_schema=False)
    async def favicon_fallback():
        return Response(status_code=204)

    @app.api_route("/", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
    @app.api_route("/{path_name:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
    async def startup_diagnostics(path_name: str = ""):
        return JSONResponse(
            status_code=500,
            content={
                "error": "FastAPI Startup Exception inside app/main.py",
                "exception_type": type(exc).__name__,
                "exception_message": str(exc),
                "traceback": err_tb.splitlines(),
                "python_version": sys.version,
                "sys_path": sys.path[:5],
            },
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
