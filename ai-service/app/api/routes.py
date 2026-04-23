from fastapi import APIRouter, UploadFile, File
import os

from app.services.pdf_service import extract_text_from_pdf
from app.services.vector_store import create_vector_store
from app.services.rag_service import ask_question

router = APIRouter()


@router.post("/upload")
async def upload(file: UploadFile = File(...)):

    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    text = extract_text_from_pdf(file_path)

    create_vector_store(text)

    os.remove(file_path)

    return {"message": "Manual processed successfully"}


@router.post("/ask")
async def ask(payload: dict):

    query = payload.get("query")

    answer = ask_question(query)

    return {"answer": answer}