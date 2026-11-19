from pathlib import Path
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Rida Optical API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # CORS Configuration
    CORS_ORIGINS: Union[str, List[str]] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "https://ridaoptical.com",
        "https://www.ridaoptical.com",
    ]

    @field_validator(
        "DEBUG",
        "FLAT_SHIPPING_FEE_PKR",
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        "DATABASE_URL",
        "IMAGEKIT_PUBLIC_KEY",
        "IMAGEKIT_PRIVATE_KEY",
        "ADMIN_PASSWORD",
        mode="before",
    )
    def handle_empty_strings(cls, v, info):
        if isinstance(v, str) and not v.strip():
            return cls.model_fields[info.field_name].default
        return v

    @field_validator("CORS_ORIGINS", mode="after")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            v_stripped = v.strip()
            if not v_stripped:
                return [
                    "http://localhost:3000",
                    "http://127.0.0.1:3000",
                    "https://ridaoptical.com",
                    "https://www.ridaoptical.com",
                ]
            if v_stripped.startswith("[") and v_stripped.endswith("]"):
                import json
                try:
                    return json.loads(v_stripped)
                except Exception:
                    pass
            return [i.strip() for i in v_stripped.split(",") if i.strip()]
        return v

    # Security & JWT Authentication
    SECRET_KEY: str = "rida-optical-super-secret-key-2026-production-token"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Database Configuration (Neon Serverless PostgreSQL target in Phase 10)
    DATABASE_URL: str | None = None

    # ImageKit CDN
    IMAGEKIT_ENDPOINT: str = "https://ik.imagekit.io/ridaoptical"
    IMAGEKIT_PUBLIC_KEY: str | None = None
    IMAGEKIT_PRIVATE_KEY: str | None = None

    # Admin Seed Credentials
    ADMIN_EMAIL: str = "ridaoptical@gmail.com"
    ADMIN_PASSWORD: str | None = None

    # Store Settings (Discovered in Tech & WooCommerce Audit)
    STORE_PHONE: str = "+923212318001"
    STORE_PHONE_DISPLAY: str = "+92 321 2318001"
    STORE_EMAIL: str = "ridaoptical@gmail.com"
    FLAT_SHIPPING_FEE_PKR: float = 349.0
    STORE_ADDRESS: str = (
        "Shop No. 2, Fatima Shopping Mall, Main Kasba Colony Bus Stop, Karachi, Sindh (74700)"
    )

    model_config = SettingsConfigDict(
        env_file=str(Path(__file__).resolve().parent.parent.parent / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
