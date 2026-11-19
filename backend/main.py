import sys
import traceback
from pathlib import Path
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse

BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

try:
    from app.main import app
except Exception as exc:
    err_tb = traceback.format_exc()
    print("STARTUP ERROR ON VERCEL:", err_tb, file=sys.stderr)
    app = FastAPI(title="Startup Diagnostics")

    @app.api_route("/", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
    @app.api_route("/{path_name:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
    async def diag(path_name: str = ""):
        return JSONResponse(status_code=500, content={"error": str(exc), "traceback": err_tb.splitlines()})
