import os
from pydantic_settings import BaseSettings

current_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(current_dir, ".env")


class Settings(BaseSettings):
    groq_api_key: str = ""
    secret_key: str = "change-this-secret-key-in-production-make-it-very-long-and-random"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    database_url: str = "sqlite:///./quickcommerce.db"

    class Config:
        env_file = env_path
        extra = "ignore"


settings = Settings()
