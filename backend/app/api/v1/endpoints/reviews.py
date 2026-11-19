from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.api.deps import get_current_admin
from app.models.user import User
from app.data.loader import repo
from app.schemas.review import ReviewSchema, ReviewCreate

router = APIRouter()


@router.get("", response_model=List[ReviewSchema], summary="List all verified customer reviews and feedback")
async def list_reviews():
    return repo.get_reviews()


@router.post("", response_model=ReviewSchema, status_code=status.HTTP_201_CREATED, summary="Admin: Add a new review image & testimonial")
async def create_review(
    payload: ReviewCreate,
    admin: User = Depends(get_current_admin),
):
    rev_dict = payload.model_dump()
    saved = repo.add_review(rev_dict)
    return saved


@router.delete("/{review_id}", summary="Admin: Delete a review")
async def delete_review(
    review_id: int,
    admin: User = Depends(get_current_admin),
):
    deleted = repo.delete_review(review_id)
    if not deleted:
        raise HTTPException(
            status_code=404,
            detail=f"Review with ID {review_id} not found.",
        )
    return {
        "success": True,
        "message": f"Review {review_id} deleted successfully.",
        "deleted_id": review_id,
    }
