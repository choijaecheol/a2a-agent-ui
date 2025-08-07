from uuid import uuid4
from app.models.task import TaskRequest, TaskResult
from app.services.mcp_client import send_task_to_mcp

# 간단한 인메모리 저장소
task_store = {}

async def handle_task_submission(task: TaskRequest) -> TaskResult:
    task_id = str(uuid4())
    task_store[task_id] = {"status": "submitted", "output": None}

    result = await send_task_to_mcp(task.agent_id, task.task_type, task.payload)
    task_store[task_id] = {"status": "completed", "output": result}

    return TaskResult(task_id=task_id, status="completed", output=result)
