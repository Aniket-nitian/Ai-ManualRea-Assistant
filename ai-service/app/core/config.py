import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PORT = os.getenv("PORT")

settings = Settings()