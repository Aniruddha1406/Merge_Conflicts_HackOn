from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import User, PaymentMethod
from schemas import PaymentMethodCreate, PaymentMethodResponse
from routers.auth import get_current_user

router = APIRouter(prefix="/api/payment-methods", tags=["payment-methods"])


@router.get("", response_model=List[PaymentMethodResponse])
def list_payment_methods(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    methods = (
        db.query(PaymentMethod)
        .filter(PaymentMethod.user_id == current_user.id)
        .order_by(PaymentMethod.is_default.desc(), PaymentMethod.created_at.desc())
        .all()
    )
    return methods


@router.post("", response_model=PaymentMethodResponse)
def create_payment_method(
    data: PaymentMethodCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if data.is_default:
        db.query(PaymentMethod).filter(
            PaymentMethod.user_id == current_user.id
        ).update({PaymentMethod.is_default: False})

    label = data.label
    if not label:
        label = {
            "cod": "Cash on Delivery",
            "upi": "UPI",
            "card": "Card",
            "netbanking": "Net Banking",
            "wallet": "Wallet",
        }.get(data.type, data.type)

    pm = PaymentMethod(
        user_id=current_user.id,
        type=data.type,
        label=label,
        details=data.details,
        is_default=data.is_default,
    )
    db.add(pm)
    db.commit()
    db.refresh(pm)
    return pm


@router.put("/{method_id}/default", response_model=PaymentMethodResponse)
def set_default_payment(
    method_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    pm = (
        db.query(PaymentMethod)
        .filter(PaymentMethod.id == method_id, PaymentMethod.user_id == current_user.id)
        .first()
    )
    if not pm:
        raise HTTPException(status_code=404, detail="Payment method not found")
    db.query(PaymentMethod).filter(PaymentMethod.user_id == current_user.id).update(
        {PaymentMethod.is_default: False}
    )
    pm.is_default = True
    db.commit()
    db.refresh(pm)
    return pm


@router.delete("/{method_id}")
def delete_payment_method(
    method_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    pm = (
        db.query(PaymentMethod)
        .filter(PaymentMethod.id == method_id, PaymentMethod.user_id == current_user.id)
        .first()
    )
    if not pm:
        raise HTTPException(status_code=404, detail="Payment method not found")
    db.delete(pm)
    db.commit()
    return {"message": "Payment method deleted"}
