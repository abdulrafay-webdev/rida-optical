from fastapi import APIRouter, HTTPException, Path
from app.data.loader import repo
from app.schemas.order import OrderCreate, OrderResponse

router = APIRouter()

# In-memory orders registry for development / active session lookups
_ORDERS_DB: dict[str, OrderResponse] = {}


@router.post("", response_model=OrderResponse, status_code=201, summary="Submit a new Cash on Delivery or WhatsApp order")
async def create_order(order_in: OrderCreate):
    # Ensure all product items exist
    for item in order_in.items:
        product = repo.get_product(item.product_id)
        if not product:
            raise HTTPException(
                status_code=400,
                detail=f"Product with ID {item.product_id} does not exist in catalog.",
            )

    order_response = repo.create_order(order_in)
    _ORDERS_DB[order_response.order_id] = order_response
    return order_response


@router.get("/{order_id}", response_model=OrderResponse, summary="Get order details by order ID")
async def get_order_by_id(order_id: str = Path(..., description="Order tracking number (e.g. RO-12345)")):
    order = _ORDERS_DB.get(order_id)
    if not order:
        raise HTTPException(
            status_code=404,
            detail=f"Order '{order_id}' was not found. Please verify your order number.",
        )
    return order
