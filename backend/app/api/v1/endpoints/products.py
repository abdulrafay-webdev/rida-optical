import math
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Query, Path
from app.data.loader import repo
from app.schemas.product import (
    ProductListItemSchema,
    ProductDetailSchema,
    ProductFilterQuery,
)
from app.schemas.common import PaginatedResponse, PaginationMeta

router = APIRouter()


@router.get("", response_model=PaginatedResponse[ProductListItemSchema], summary="List and filter optical frames")
async def list_products(
    category: Optional[str] = Query(None, description="Category slug (e.g. eye-glasses, sunglasses)"),
    q: Optional[str] = Query(None, description="Search term for title, SKU, color"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum frame price in PKR"),
    max_price: Optional[float] = Query(None, ge=0, description="Maximum frame price in PKR"),
    color: Optional[str] = Query(None, description="Color name filter (e.g. Silver, Green, Golden)"),
    in_stock_only: bool = Query(False, description="Filter only in-stock frames"),
    has_prescription: Optional[bool] = Query(None, description="Filter frames supporting prescription lenses"),
    sort_by: str = Query("featured", pattern="^(featured|price_asc|price_desc|title_asc)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
):
    filter_params = ProductFilterQuery(
        category=category,
        q=q,
        min_price=min_price,
        max_price=max_price,
        color=color,
        in_stock_only=in_stock_only,
        has_prescription=has_prescription,
        sort_by=sort_by,
        page=page,
        page_size=page_size,
    )

    items, total = repo.get_products(filter_params)
    total_pages = math.ceil(total / page_size) if total > 0 else 1

    return PaginatedResponse(
        items=items,
        meta=PaginationMeta(
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
            has_next=page < total_pages,
            has_prev=page > 1,
        ),
    )


@router.get("/featured", response_model=List[ProductListItemSchema], summary="Get featured bestseller eyewear")
async def get_featured_products(
    limit: int = Query(8, ge=1, le=20, description="Number of featured frames")
):
    filter_params = ProductFilterQuery(page=1, page_size=limit)
    items, _ = repo.get_products(filter_params)
    return items


@router.get("/{slug_or_id}", response_model=ProductDetailSchema, summary="Get single product by slug or ID")
async def get_product_detail(
    slug_or_id: str = Path(..., description="Product slug or numeric ID")
):
    product = repo.get_product(slug_or_id)
    if not product:
        raise HTTPException(
            status_code=404,
            detail=f"Product with identifier '{slug_or_id}' was not found in catalog.",
        )
    return product
