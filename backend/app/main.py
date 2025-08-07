from fastapi import FastAPI
from app.api.routes import webhooks
import asyncio
import uvicorn
from app.api.routes import tasks
from app.services.mcp_tasks import app as mcp_app  # FastMCP app

app = FastAPI()
app.include_router(tasks.router, prefix="")

# 웹훅 라우터 등록
app.include_router(webhooks.router)

async def start_mcp_server():
    # FastMCP 서버를 별도 Task로 실행 (비동기 실행)
    await mcp_app.serve()

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    # FastAPI 실행 및 MCP 서버 병렬 실행
    loop.create_task(start_mcp_server())
    uvicorn.run(fastapi_app, host="0.0.0.0", port=8000)