from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import User, Address
from schemas import AddressCreate, AddressResponse
from routers.auth import get_current_user

router = APIRouter(prefix="/api/addresses", tags=["addresses"])


def _to_response(addr: Address) -> AddressResponse:
    return AddressResponse(
        id=addr.id,
        full_name=addr.full_name or "",
        phone=addr.phone or "",
        line1=addr.line1 or "",
        line2=addr.line2 or "",
        city=addr.city or "",
        state=addr.state or "",
        pincode=addr.pincode or "",
        is_default=bool(addr.is_default),
        one_line=addr.one_line(),
    )


@router.get("", response_model=List[AddressResponse])
def list_addresses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    addresses = (
        db.query(Address)
        .filter(Address.user_id == current_user.id)
        .order_by(Address.is_default.desc(), Address.created_at.desc())
        .all()
    )
    return [_to_response(a) for a in addresses]


@router.post("", response_model=AddressResponse)
def create_address(
    data: AddressCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if data.is_default:
        db.query(Address).filter(Address.user_id == current_user.id).update(
            {Address.is_default: False}
        )
    addr = Address(
        user_id=current_user.id,
        full_name=data.full_name,
        phone=data.phone,
        line1=data.line1,
        line2=data.line2,
        city=data.city,
        state=data.state,
        pincode=data.pincode,
        is_default=data.is_default,
    )
    db.add(addr)
    db.commit()
    db.refresh(addr)
    return _to_response(addr)


@router.put("/{address_id}/default", response_model=AddressResponse)
def set_default_address(
    address_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    addr = (
        db.query(Address)
        .filter(Address.id == address_id, Address.user_id == current_user.id)
        .first()
    )
    if not addr:
        raise HTTPException(status_code=404, detail="Address not found")
    db.query(Address).filter(Address.user_id == current_user.id).update(
        {Address.is_default: False}
    )
    addr.is_default = True
    db.commit()
    db.refresh(addr)
    return _to_response(addr)


@router.delete("/{address_id}")
def delete_address(
    address_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    addr = (
        db.query(Address)
        .filter(Address.id == address_id, Address.user_id == current_user.id)
        .first()
    )
    if not addr:
        raise HTTPException(status_code=404, detail="Address not found")
    db.delete(addr)
    db.commit()
    return {"message": "Address deleted"}
