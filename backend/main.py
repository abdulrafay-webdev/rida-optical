import sys
import traceback
from pathlib import Path
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse

# Add directory to sys.path so 'app' package is always resolvable
BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

try:
    from app.main import app
except Exception as exc:
    err_tb = traceback.format_exc()
    print("CRITICAL FASTAPI STARTUP ERROR ON VERCEL:", err_tb, file=sys.stderr)

    app = FastAPI(title="Rida Optical API - Startup Diagnostics")

    @app.get("/favicon.ico", include_in_schema=False)
    async def favicon():
        return Response(status_code=204)

    @app.api_route("/", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
    @app.api_route("/{path_name:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
    async def diagnostics(path_name: str = ""):
        return JSONResponse(
            status_code=500,
            content={
                "error": "FastAPI Startup Exception on Vercel",
                "exception_type": type(exc).__name__,
                "exception_message": str(exc),
                "traceback": err_tb.splitlines(),
                "python_version": sys.version,
                "sys_path": sys.path[:5],
            },
        )
