from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import User, Order, Address, PaymentMethod
from schemas import OrderResponse, CreateOrderRequest, PayOrderRequest
from services import order_service
from routers.auth import get_current_user

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.get("", response_model=List[OrderResponse])
def list_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    orders = (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .order_by(Order.created_at.desc())
        .all()
    )
    return orders


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id, Order.user_id == current_user.id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("", response_model=OrderResponse)
def create_order(
    data: CreateOrderRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a pending order from explicit product ids (manual / Buy Now)."""
    # Resolve address
    address_str = ""
    if data.address_id:
        addr = (
            db.query(Address)
            .filter(Address.id == data.address_id, Address.user_id == current_user.id)
            .first()
        )
        if addr:
            address_str = addr.one_line()
    else:
        addr = (
            db.query(Address)
            .filter(Address.user_id == current_user.id, Address.is_default == True)
            .first()
        )
        if addr:
            address_str = addr.one_line()

    # Resolve payment method label
    payment_label = ""
    if data.payment_method_id:
        pm = (
            db.query(PaymentMethod)
            .filter(
                PaymentMethod.id == data.payment_method_id,
                PaymentMethod.user_id == current_user.id,
            )
            .first()
        )
        if pm:
            payment_label = pm.label
    else:
        pm = (
            db.query(PaymentMethod)
            .filter(
                PaymentMethod.user_id == current_user.id,
                PaymentMethod.is_default == True,
            )
            .first()
        )
        if pm:
            payment_label = pm.label

    result = order_service.create_order_from_products(
        user_id=current_user.id,
        product_ids=data.product_ids,
        db=db,
        delivery_address=address_str,
        payment_method=payment_label,
        status="pending",
        payment_status="unpaid",
    )
    if not result:
        raise HTTPException(status_code=400, detail="No valid products to order")

    order = db.query(Order).filter(Order.id == result["order_id"]).first()
    return order


@router.post("/{order_id}/pay", response_model=OrderResponse)
def pay_order(
    order_id: str,
    data: PayOrderRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Payment portal: mark an order as paid and completed."""
    payment_label = ""
    if data.payment_method_id:
        pm = (
            db.query(PaymentMethod)
            .filter(
                PaymentMethod.id == data.payment_method_id,
                PaymentMethod.user_id == current_user.id,
            )
            .first()
        )
        if pm:
            payment_label = pm.label

    result = order_service.pay_order(
        user_id=current_user.id,
        order_id=order_id,
        db=db,
        payment_method=payment_label,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Order not found")

    order = db.query(Order).filter(Order.id == order_id).first()
    return order
