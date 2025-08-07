from pydantic import BaseModel
from typing import Optional, Dict

class TaskRequest(BaseModel):
    agent_id: str
    task_type: str
    payload: Dict[str, str]

class TaskResult(BaseModel):
    task_id: str
    status: str
    output: Optional[Dict[str, str]] = None
