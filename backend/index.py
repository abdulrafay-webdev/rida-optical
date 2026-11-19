import sys
from pathlib import Path

# Add directory to sys.path so 'app' package is always resolvable
BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from main import app
