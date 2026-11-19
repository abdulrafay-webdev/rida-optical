from typing import List
from fastapi import APIRouter, Query
from app.data.loader import repo

router = APIRouter()


@router.get("", summary="Quick autocomplete search across eyewear catalog")
async def search_eyewear(
    q: str = Query(..., min_length=1, description="Search term for model name, brand, SKU or color"),
    limit: int = Query(8, ge=1, le=20),
):
    results = repo.search(q, limit=limit)
    return {
        "query": q,
        "count": len(results),
        "results": results,
    }
