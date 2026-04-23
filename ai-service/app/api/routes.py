from fastapi import APIRouter, UploadFile, File
import os

from app.services.pdf_service import extract_text_from_pdf
from app.services.file_service import download_file
from app.services.vector_store import create_vector_store
from app.services.rag_service import ask_question

router = APIRouter()


@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:
        file_path = f"temp_{file.filename}"

        with open(file_path, "wb") as f:
            f.write(await file.read())

        text = extract_text_from_pdf(file_path)

        create_vector_store(text)

        os.remove(file_path)

        return {"message": "Manual processed successfully"}

    except Exception as e:
        return {"error": str(e)}


@router.post("/upload-url")
async def upload_url(payload: dict):
    try:
        file_url = payload.get("file_url")

        if not file_url:
            return {"error": "file_url missing"}

        file_path = download_file(file_url)

        text = extract_text_from_pdf(file_path)

        create_vector_store(text)

        os.remove(file_path)

        return {"message": "Vector DB created"}

    except Exception as e:
        return {"error": str(e)}


@router.post("/ask")
async def ask(payload: dict):
    try:
        query = payload.get("query")

        if not query:
            return {"error": "query missing"}

        answer = ask_question(query)

        return {"answer": answer}

    except Exception as e:
        return {"error": str(e)}