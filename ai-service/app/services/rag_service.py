def get_relevant_docs(vector_store, query):
    docs = vector_store.similarity_search(query, k=3)
    return [doc.page_content for doc in docs]