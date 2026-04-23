from app.services.vector_store import load_vector_store
from app.services.llm_service import get_llm


def ask_question(query: str):

    vector_store = load_vector_store()

    docs = vector_store.similarity_search(query, k=3)

    context = "\n".join([doc.page_content for doc in docs])

    prompt = f"""
You are an expert machine operator assistant.

Context:
{context}

Question:
{query}

Give step-by-step answer.
"""

    llm = get_llm()

    response = llm.generate_content(prompt)

    return response.text