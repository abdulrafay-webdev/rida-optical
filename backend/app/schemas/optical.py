from typing import Optional, List
from pydantic import BaseModel, Field


class LensUsageOptionSchema(BaseModel):
    id: str
    name: str
    slug: str
    description: Optional[str] = None
    price_modifier_pkr: float = 0.0
    is_default: bool = False


class LensCoatingOptionSchema(BaseModel):
    id: str
    name: str
    slug: str
    category: str
    price_pkr: float
    description: Optional[str] = None


class PrescriptionInputConfigSchema(BaseModel):
    label: str
    placeholder: Optional[str] = None
    required: bool = False
    accepted_formats: Optional[List[str]] = None
    max_size_mb: Optional[int] = None


class OpticalNoticeSchema(BaseModel):
    title: str
    message: str


class OpticalConfigResponse(BaseModel):
    engine_name: str
    version: str
    currency: str = "PKR"
    important_notice: OpticalNoticeSchema
    step_1_usage_types: List[LensUsageOptionSchema]
    step_2_lens_coatings: List[LensCoatingOptionSchema]
    step_3_prescription_inputs: dict[str, PrescriptionInputConfigSchema]


class EyePowerSchema(BaseModel):
    sph: Optional[str] = None
    cyl: Optional[str] = None
    axis: Optional[str] = None


class CustomerPrescriptionSchema(BaseModel):
    prescription_text: Optional[str] = None
    prescription_file_url: Optional[str] = None
    pd_measurement: Optional[str] = None
    right_eye: Optional[EyePowerSchema] = None
    left_eye: Optional[EyePowerSchema] = None
    comments: Optional[str] = None


class OpticalSelectionPayload(BaseModel):
    type: str = Field(default="frame_only", pattern="^(frame_only|prescription)$")
    usage_id: Optional[str] = None
    coating_id: Optional[str] = None
    prescription: Optional[CustomerPrescriptionSchema] = None
    optical_surcharge_pkr: float = 0.0
