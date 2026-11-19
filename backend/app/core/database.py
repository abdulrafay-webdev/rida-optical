from pathlib import Path
import re
import tempfile
from typing import Generator
from sqlmodel import create_engine, Session, SQLModel
from app.core.config import settings


def get_database_url() -> str:
    url = settings.DATABASE_URL
    if not url:
        # On Vercel serverless / read-only filesystem, use /tmp or memory
        tmp_db = Path(tempfile.gettempdir()) / "rida_optical_dev.db"
        return f"sqlite:///{tmp_db}"

    # Strip channel_binding if present (causes issues with connection poolers & older libpq on serverless)
    if "channel_binding=" in url:
        url = re.sub(r"[?&]channel_binding=[^&]+", "", url)
        if "?" not in url and "&" in url:
            url = url.replace("&", "?", 1)

    # Normalize Heroku/Neon legacy prefix if present
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+psycopg://", 1)
    elif url.startswith("postgresql://") and not url.startswith("postgresql+"):
        url = url.replace("postgresql://", "postgresql+psycopg://", 1)

    return url


database_url = get_database_url()
is_sqlite = database_url.startswith("sqlite")

# Engine options
engine_kwargs = {
    "echo": False,
}

if is_sqlite:
    engine_kwargs["connect_args"] = {"check_same_thread": False}
else:
    # Neon Serverless PostgreSQL pooling optimization
    engine_kwargs["pool_pre_ping"] = True
    engine_kwargs["pool_recycle"] = 300
    engine_kwargs["pool_size"] = 5
    engine_kwargs["max_overflow"] = 10

engine = create_engine(database_url, **engine_kwargs)


def init_db():
    """Create all registered SQLModel tables"""
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """Dependency for providing database session to FastAPI routes"""
    with Session(engine) as session:
        yield session
