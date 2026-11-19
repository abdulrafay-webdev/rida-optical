import sys
import traceback
from pathlib import Path
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse

# Add backend directory to sys.path so 'app' package is resolvable
REPO_ROOT = Path(__file__).resolve().parent.parent
BACKEND_DIR = REPO_ROOT / "backend"

for p in [str(BACKEND_DIR), str(REPO_ROOT)]:
    if p not in sys.path:
        sys.path.insert(0, p)

try:
    from app.main import app
except Exception as exc:
    err_tb = traceback.format_exc()
    print("CRITICAL FASTAPI STARTUP ERROR ON VERCEL (ROOT ENTRYPOINT):", err_tb, file=sys.stderr)

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
                "error": "FastAPI Startup Exception on Vercel (Root Entrypoint)",
                "exception_type": type(exc).__name__,
                "exception_message": str(exc),
                "traceback": err_tb.splitlines(),
                "python_version": sys.version,
                "sys_path": sys.path[:5],
            },
        )
