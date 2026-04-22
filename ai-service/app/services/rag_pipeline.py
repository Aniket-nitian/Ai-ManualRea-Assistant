import json
from app.services.embedding_service import get_embeddings
from app.services.rag_service import get_relevant_docs
from app.services.llm_service import get_llm
from app.prompts import TRAINER_PROMPT
from langchain.vectorstores import FAISS

def generate_answer(query: str, history: str = "", language="en"):
    embeddings = get_embeddings()
    vector_store = FAISS.load_local("vector_db", embeddings)

    docs = get_relevant_docs(vector_store, query)
    context = "\n".join(docs)

    prompt = TRAINER_PROMPT.format(
    context=context,
    question=query,
    history=history,
    language=language
)

    llm = get_llm()
    response = llm.generate_content(prompt)

    raw = response.text

    # 🔥 Parse JSON safely
    try:
        parsed = json.loads(raw)
    except:
        parsed = {
            "steps": [],
            "warnings": [],
            "troubleshooting": [],
            "tools_required": [],
            "estimated_time": "",
            "summary": raw
        }

    return parsed