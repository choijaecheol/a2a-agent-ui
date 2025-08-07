from fastapi import APIRouter
from app.models.task import TaskRequest, TaskResult
from app.services.task_manager import handle_task_submission
from app.services.task_manager import run_graph

router = APIRouter()

@router.post("/send", response_model=TaskResult)
async def submit_task(request: TaskRequest):
    return await handle_task_submission(request)

@router.post("/tasks/run")
async def run_tasks(input_data: dict):
    result = run_graph(input_data)
    return {"result": result}