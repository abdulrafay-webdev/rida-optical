from typing import Optional, List, Union
from fastapi import APIRouter, HTTPException, Query, Path
from app.data.loader import repo
from app.schemas.category import CategorySchema, CategoryTreeSchema

router = APIRouter()


@router.get("", response_model=Union[List[CategoryTreeSchema], List[CategorySchema]], summary="List product categories")
async def list_categories(
    parent_only: bool = Query(False, description="Filter only root level categories"),
    tree: bool = Query(False, description="Return nested hierarchical category tree"),
):
    return repo.get_categories(parent_only=parent_only, as_tree=tree)


@router.get("/{slug_or_id}", response_model=CategorySchema, summary="Get single category details")
async def get_category(
    slug_or_id: str = Path(..., description="Category slug or ID")
):
    category = repo.get_category(slug_or_id)
    if not category:
        raise HTTPException(
            status_code=404,
            detail=f"Category '{slug_or_id}' was not found.",
        )
    return category
