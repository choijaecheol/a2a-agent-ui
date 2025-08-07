from fastapi import APIRouter
from app.models.agent_card import AgentCard

router = APIRouter()

@router.get("/", response_model=list[AgentCard])
async def list_agents():
    return [
        AgentCard(id="agent-001", name="LangChainAgent", description="LLM 기반 LangChain 실행 에이전트", tasks_supported=["search"]),
        AgentCard(id="agent-002", name="PlannerAgent", description="LLM 기반 LangChain 실행 에이전트", tasks_supported=["plan"])
    ]
