from fastapi import FastAPI
from app.api.routes import router

app = FastAPI()

app.include_router(router, prefix="/api")

@app.get("/")
def root():
    return {"message": "AI Service Running"}