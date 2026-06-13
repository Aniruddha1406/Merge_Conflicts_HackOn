from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, UserProfile
from ..schemas import ChatRequest, ChatResponse
from ..services.llm_service import get_chat_response
from .auth import get_current_user

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        profile = db.query(UserProfile).filter(
            UserProfile.user_id == current_user.id
        ).first()

        user_profile = None
        if profile:
            user_profile = {
                "is_vegetarian": profile.is_vegetarian,
                "is_vegan": profile.is_vegan,
                "is_high_protein": profile.is_high_protein,
                "budget_preference": profile.budget_preference,
            }

        result = get_chat_response(
            message=request.message,
            history=[h.model_dump() for h in request.history],
            user_profile=user_profile,
        )
        return ChatResponse(**result)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"LLM service error: {str(e)}"
        )
