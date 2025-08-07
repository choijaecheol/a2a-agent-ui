from fastapi import APIRouter, Request, HTTPException
from typing import Dict, Any
from pydantic import BaseModel, ValidationError
import logging

# 로깅 설정
logger = logging.getLogger(__name__)

# 웹훅 데이터 모델
class WebhookData(BaseModel):
    event_type: str
    payload: Dict[str, Any]

# 라우터 설정 (프리픽스 추가)
router = APIRouter(
    prefix="/webhooks",
    tags=["webhooks"]
)

@router.post("/", response_model=Dict[str, Any])
async def receive_webhook(request: Request):
    try:
        # 요청 데이터 파싱
        data = await request.json()
        
        # 데이터 검증
        webhook_data = WebhookData(
            event_type=data.get("event_type"),
            payload=data.get("payload", {})
        )
        
        # 이벤트 타입에 따른 처리
        if webhook_data.event_type == "agent_created":
            logger.info(f"Agent created: {webhook_data.payload}")
            # TODO: Agent 생성 로직
        elif webhook_data.event_type == "agent_updated":
            logger.info(f"Agent updated: {webhook_data.payload}")
            # TODO: Agent 업데이트 로직
        else:
            logger.warning(f"Unknown event type: {webhook_data.event_type}")
            
        return {
            "status": "success",
            "message": f"Processed {webhook_data.event_type} event",
            "data": webhook_data.dict()
        }
            
    except ValidationError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=422,
            detail={"status": "error", "message": "Invalid webhook data format"}
        )
    except Exception as e:
        logger.error(f"Error processing webhook: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"status": "error", "message": "Internal server error"}
        )
