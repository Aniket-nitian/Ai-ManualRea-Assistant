from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(title="AI Manual Service")

@app.get("/")
def root():
    return {"message": "AI Service Running"}
app.include_router(router)