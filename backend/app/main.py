from fastapi import FastAPI
from app.api.routes import webhooks

app = FastAPI()

# 웹훅 라우터 등록
app.include_router(webhooks.router)
