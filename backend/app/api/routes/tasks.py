from fastapi import APIRouter
from app.models.task import TaskRequest, TaskResult
from app.services.task_manager import handle_task_submission

router = APIRouter()

@router.post("/send", response_model=TaskResult)
async def submit_task(request: TaskRequest):
    return await handle_task_submission(request)
