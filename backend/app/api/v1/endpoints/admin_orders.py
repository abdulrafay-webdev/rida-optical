from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, Path, status
from pydantic import BaseModel
from sqlmodel import Session, select, func
from app.core.database import get_session
from app.api.deps import get_current_admin
from app.models.order import Order, OrderItem, Customer
from app.models.user import User

router = APIRouter()


class OrderStatusUpdate(BaseModel):
    status: str
    tracking_number: Optional[str] = None
    courier_name: Optional[str] = None
    order_notes: Optional[str] = None


class AdminOrderItemSchema(BaseModel):
    id: int
    product_id: int
    product_title: str
    variation_title: Optional[str] = None
    unit_frame_price: float
    quantity: int
    line_total: float
    has_prescription: bool
    optical_surcharge: float
    prescription_text: Optional[str] = None
    prescription_file_url: Optional[str] = None


class AdminOrderDetailSchema(BaseModel):
    id: int
    order_number: str
    created_at: str
    status: str
    payment_method: str
    payment_status: str
    subtotal_pkr: float
    shipping_fee_pkr: float
    discount_pkr: float
    total_amount_pkr: float
    shipping_address: str
    shipping_city: str
    order_notes: Optional[str] = None
    tracking_number: Optional[str] = None
    courier_name: Optional[str] = None
    customer: dict
    items: List[AdminOrderItemSchema]
    whatsapp_url: str


@router.get("/stats", summary="Get administrative e-commerce dashboard statistics")
async def get_admin_stats(
    session: Session = Depends(get_session),
    admin: User = Depends(get_current_admin),
):
    total_orders = len(session.exec(select(Order)).all())
    pending_orders = len(session.exec(select(Order).where(Order.status == "pending")).all())
    dispatched_orders = len(session.exec(select(Order).where(Order.status == "dispatched")).all())
    completed_orders = len(session.exec(select(Order).where(Order.status == "completed")).all())

    # Total revenue
    orders = session.exec(select(Order)).all()
    total_revenue = sum(o.total_amount_pkr for o in orders)

    return {
        "total_orders": total_orders,
        "pending_orders": pending_orders,
        "dispatched_orders": dispatched_orders,
        "completed_orders": completed_orders,
        "total_revenue_pkr": total_revenue,
        "currency": "PKR",
    }


@router.get("/orders", summary="List all customer orders with filtering")
async def list_admin_orders(
    status_filter: Optional[str] = Query(None, alias="status"),
    q: Optional[str] = Query(None, description="Search by order number, customer name, phone, city"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    session: Session = Depends(get_session),
    admin: User = Depends(get_current_admin),
):
    query = select(Order).order_by(Order.id.desc())

    if status_filter:
        query = query.where(Order.status == status_filter)

    orders = session.exec(query).all()

    # Search filter in-memory if query given
    if q and q.strip():
        search_term = q.strip().lower()
        filtered = []
        for o in orders:
            cust = session.get(Customer, o.customer_id)
            c_name = cust.full_name.lower() if cust else ""
            c_phone = cust.phone.lower() if cust else ""
            if (
                search_term in o.order_number.lower()
                or search_term in o.shipping_city.lower()
                or search_term in c_name
                or search_term in c_phone
            ):
                filtered.append(o)
        orders = filtered

    total = len(orders)
    start = (page - 1) * page_size
    paged = orders[start : start + page_size]

    items = []
    for o in paged:
        cust = session.get(Customer, o.customer_id)
        phone_clean = cust.phone.replace("+", "").replace(" ", "") if cust else ""
        wa_url = f"https://wa.me/{phone_clean}" if phone_clean else ""

        items.append({
            "id": o.id,
            "order_number": o.order_number,
            "created_at": o.created_at.isoformat() if hasattr(o.created_at, "isoformat") else str(o.created_at),
            "status": o.status,
            "payment_method": o.payment_method,
            "total_amount_pkr": o.total_amount_pkr,
            "shipping_city": o.shipping_city,
            "customer_name": cust.full_name if cust else "Guest",
            "customer_phone": cust.phone if cust else "",
            "items_count": len(o.items),
            "tracking_number": o.tracking_number,
            "courier_name": o.courier_name,
            "whatsapp_url": wa_url,
        })

    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size,
    }


@router.get("/orders/{order_id}", response_model=AdminOrderDetailSchema, summary="Get full single order details")
async def get_admin_order(
    order_id: str = Path(..., description="Order ID or Order Number"),
    session: Session = Depends(get_session),
    admin: User = Depends(get_current_admin),
):
    if order_id.isdigit():
        order = session.get(Order, int(order_id))
    else:
        order = session.exec(select(Order).where(Order.order_number == order_id)).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")

    cust = session.get(Customer, order.customer_id)
    phone_clean = cust.phone.replace("+", "").replace(" ", "") if cust else ""
    wa_url = f"https://wa.me/{phone_clean}" if phone_clean else ""

    items_list = [
        AdminOrderItemSchema(
            id=it.id or 0,
            product_id=it.product_id,
            product_title=it.product_title,
            variation_title=it.variation_title,
            unit_frame_price=it.unit_frame_price,
            quantity=it.quantity,
            line_total=it.line_total,
            has_prescription=it.has_prescription,
            optical_surcharge=it.optical_surcharge,
            prescription_text=it.prescription_text,
            prescription_file_url=it.prescription_file_url,
        )
        for it in order.items
    ]

    return AdminOrderDetailSchema(
        id=order.id or 0,
        order_number=order.order_number,
        created_at=order.created_at.isoformat() if hasattr(order.created_at, "isoformat") else str(order.created_at),
        status=order.status,
        payment_method=order.payment_method,
        payment_status=order.payment_status,
        subtotal_pkr=order.subtotal_pkr,
        shipping_fee_pkr=order.shipping_fee_pkr,
        discount_pkr=order.discount_pkr,
        total_amount_pkr=order.total_amount_pkr,
        shipping_address=order.shipping_address,
        shipping_city=order.shipping_city,
        order_notes=order.order_notes,
        tracking_number=order.tracking_number,
        courier_name=order.courier_name,
        customer={
            "full_name": cust.full_name if cust else "",
            "phone": cust.phone if cust else "",
            "alternate_phone": cust.alternate_phone if cust else None,
            "email": cust.email if cust else None,
            "address": cust.address if cust else "",
            "city": cust.city if cust else "",
        },
        items=items_list,
        whatsapp_url=wa_url,
    )


@router.patch("/orders/{order_id}/status", summary="Update order status and courier tracking")
async def update_order_status(
    payload: OrderStatusUpdate,
    order_id: str = Path(...),
    session: Session = Depends(get_session),
    admin: User = Depends(get_current_admin),
):
    if order_id.isdigit():
        order = session.get(Order, int(order_id))
    else:
        order = session.exec(select(Order).where(Order.order_number == order_id)).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")

    valid_statuses = {"pending", "processing", "dispatched", "completed", "cancelled"}
    if payload.status.lower() not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status '{payload.status}'. Must be one of {valid_statuses}",
        )

    order.status = payload.status.lower()
    if payload.tracking_number is not None:
        order.tracking_number = payload.tracking_number
    if payload.courier_name is not None:
        order.courier_name = payload.courier_name
    if payload.order_notes is not None:
        order.order_notes = payload.order_notes

    session.add(order)
    session.commit()
    session.refresh(order)

    return {
        "success": True,
        "order_number": order.order_number,
        "new_status": order.status,
        "tracking_number": order.tracking_number,
        "courier_name": order.courier_name,
    }
