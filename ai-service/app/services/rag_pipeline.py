from app.services.embedding_service import get_embeddings
from app.services.rag_service import get_relevant_docs
from app.services.llm_service import get_llm
from app.prompts import TRAINER_PROMPT
from langchain.vectorstores import FAISS

def generate_answer(query: str):
    embeddings = get_embeddings()

    vector_store = FAISS.load_local("vector_db", embeddings)

    docs = get_relevant_docs(vector_store, query)

    context = "\n".join(docs)

    prompt = TRAINER_PROMPT.format(
        context=context,
        question=query
    )

    llm = get_llm()

    response = llm.generate_content(prompt)

    return response.text