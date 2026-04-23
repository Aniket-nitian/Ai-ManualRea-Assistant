import json
from app.services.embedding_service import get_embeddings
from app.services.rag_service import get_relevant_docs
from app.services.llm_service import get_llm
from app.services.prompt_service import TRAINER_PROMPT
from app.services.vector_db_service import FAISS
from app.services.cache_service import get_cache, set_cache


def generate_answer(query: str, history: str = "", language="en"):

    # 🔥 Check cache first
    cache_key = f"{query}_{language}"
    cached = get_cache(cache_key)

    if cached:
        return json.loads(cached)

    embeddings = get_embeddings()
    vector_store = FAISS.load_local(
        "vector_db",
        embeddings,
        allow_dangerous_deserialization=True
    )

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

    # 🔥 Save to cache
    set_cache(cache_key, json.dumps(parsed))

    return parsed