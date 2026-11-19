from typing import List, Optional
from fastapi import APIRouter, Query
from app.data.loader import repo
from app.schemas.optical import (
    OpticalConfigResponse,
    LensCoatingOptionSchema,
    LensUsageOptionSchema,
)

router = APIRouter()


@router.get("/options", response_model=OpticalConfigResponse, summary="Get full optical prescription lens configuration")
async def get_optical_options():
    return repo.get_optical_config()


@router.get("/coatings", response_model=List[LensCoatingOptionSchema], summary="List all 15 lens coatings & surcharges")
async def get_lens_coatings(
    category: Optional[str] = Query(None, description="Filter by coating category (clear, blue_cut, photochromic, driving, tinted, polycarbonate)")
):
    coatings = list(repo._coatings_by_id.values())
    if category:
        coatings = [c for c in coatings if c.get("category") == category]
    return coatings


@router.get("/usage-types", response_model=List[LensUsageOptionSchema], summary="List vision usage types")
async def get_usage_types():
    return list(repo._usage_by_id.values())
