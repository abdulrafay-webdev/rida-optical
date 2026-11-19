from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.core.database import get_session
from app.core.security import verify_password, create_access_token
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse, UserSummary
from app.api.deps import get_current_user

router = APIRouter()


@router.post("/login", response_model=TokenResponse, summary="Admin Login & Token Generation")
async def login(credentials: LoginRequest, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == credentials.email)).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is deactivated.",
        )

    access_token = create_access_token(
        subject=user.email,
        extra_claims={"user_id": user.id, "role": user.role, "is_superuser": user.is_superuser},
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserSummary(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            role=user.role,
            is_superuser=user.is_superuser,
        ),
    )


@router.get("/me", response_model=UserSummary, summary="Get Current Authenticated User")
async def get_me(current_user: User = Depends(get_current_user)):
    return UserSummary(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        role=current_user.role,
        is_superuser=current_user.is_superuser,
    )
