import sys
from pathlib import Path

# Add backend root directory to sys.path so 'app' package is always resolvable by Vercel serverless
BACKEND_DIR = Path(__file__).resolve().parent.parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from app.main import app
