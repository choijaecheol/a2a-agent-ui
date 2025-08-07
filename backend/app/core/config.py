from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MCP_ENDPOINT: str = "http://localhost:8001"
    class Config:
        env_file = ".env"

settings = Settings()
