import google.generativeai as genai
from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

def get_llm():
    return genai.GenerativeModel("gemini-2.5-flash-lite")