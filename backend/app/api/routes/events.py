from fastapi import APIRouter
from fastapi.responses import StreamingResponse

router = APIRouter()

@router.get("/stream")
async def stream_logs():
    async def event_generator():
        for i in range(10):
            yield f"data: Log message {i}\n\n"
    return StreamingResponse(event_generator(), media_type="text/event-stream")
