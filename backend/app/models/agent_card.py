from pydantic import BaseModel
from typing import List, Optional

class AgentCard(BaseModel):
    id: str
    name: str
    description: Optional[str]
    tasks_supported: List[str]
