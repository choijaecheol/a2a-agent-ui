import httpx
from app.core.config import settings
from app.core.a2a_protocol import build_json_rpc_request

async def send_task_to_mcp(agent_id: str, task_type: str, payload: dict):
    request_data = build_json_rpc_request(
        method="execute_task",
        params={"agent_id": agent_id, "task_type": task_type, "payload": payload}
    )
    async with httpx.AsyncClient() as client:
        response = await client.post(settings.MCP_ENDPOINT, json=request_data)
        return response.json()
