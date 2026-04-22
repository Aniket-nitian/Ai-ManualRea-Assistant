import os
import uuid
from fastapi import APIRouter
from app.services.file_service import download_file
from app.services.pdf_service import extract_text_from_pdf
from langchain.vectorstores import FAISS
from app.services.embedding_service import get_embeddings
from app.services.rag_service import get_relevant_docs
from app.services.rag_pipeline import generate_answer


router = APIRouter()

import os

from app.services.chunk_service import split_text
from app.services.embedding_service import get_embeddings
from app.services.vector_db_service import create_vector_store

@router.post("/process")
async def process_file(payload: dict):
    file_url = payload.get("file_url")

    file_path = f"temp_{uuid.uuid4()}.pdf"

    download_file(file_url, file_path)

    text = extract_text_from_pdf(file_path)

    chunks = split_text(text)

    embeddings = get_embeddings()

    vector_store = create_vector_store(chunks, embeddings)

    # Save vector store (for later queries)
    vector_store.save_local("vector_db")

    os.remove(file_path)

    return {
        "message": "Manual processed and stored",
        "chunks": len(chunks)
    }

@router.post("/chat")
async def chat(payload: dict):
    query = payload.get("query")

    embeddings = get_embeddings()

    vector_store = FAISS.load_local("vector_db", embeddings)

    docs = get_relevant_docs(vector_store, query)

    return {
        "query": query,
        "context": docs
    }

@router.post("/chat")
async def chat(payload: dict):
    query = payload.get("query")

    answer = generate_answer(query)

    return {
        "query": query,
        "answer": answer
    }