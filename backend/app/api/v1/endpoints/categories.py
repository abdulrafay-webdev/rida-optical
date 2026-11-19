import re
from typing import Optional, List, Union
from fastapi import APIRouter, HTTPException, Query, Path, Depends, status
from sqlmodel import Session
from app.core.database import get_session
from app.api.deps import get_current_admin
from app.models.user import User
from app.models.category import Category
from app.data.loader import repo
from app.schemas.category import CategorySchema, CategoryTreeSchema, CategoryCreate, CategoryUpdate

router = APIRouter()


def slugify(text: str) -> str:
    cleaned = re.sub(r"[^\w\s-]", "", text.lower()).strip()
    return re.sub(r"[-\s]+", "-", cleaned)


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


@router.post("", response_model=CategorySchema, status_code=status.HTTP_201_CREATED, summary="Create a new product category")
async def create_category(
    payload: CategoryCreate,
    session: Session = Depends(get_session),
    admin: User = Depends(get_current_admin),
):
    name = payload.name.strip()
    slug = payload.slug.strip() if payload.slug and payload.slug.strip() else slugify(name)
    if repo.get_category(slug):
        slug = f"{slug}-{len(repo._categories) + 1}"

    cat_dict = {
        "name": name,
        "slug": slug,
        "parent_id": payload.parent_id,
        "description": payload.description or "",
        "product_count": 0,
        "thumbnail_id": None,
    }

    try:
        db_cat = Category(
            name=cat_dict["name"],
            slug=cat_dict["slug"],
            description=cat_dict["description"],
            parent_id=cat_dict["parent_id"],
            product_count=0,
            is_active=True,
        )
        session.add(db_cat)
        session.commit()
        session.refresh(db_cat)
        cat_dict["id"] = db_cat.id
    except Exception as e:
        session.rollback()
        print(f"Warning: Category DB persist error: {e}")

    saved_cat = repo.add_category(cat_dict)
    return saved_cat


@router.delete("/{category_id}", summary="Delete a category")
async def delete_category(
    category_id: int,
    session: Session = Depends(get_session),
    admin: User = Depends(get_current_admin),
):
    try:
        db_cat = session.get(Category, category_id)
        if db_cat:
            session.delete(db_cat)
            session.commit()
    except Exception:
        session.rollback()

    deleted = repo.delete_category(category_id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"Category with ID {category_id} not found.")

    return {
        "success": True,
        "message": f"Category {category_id} deleted successfully.",
        "deleted_id": category_id,
    }
