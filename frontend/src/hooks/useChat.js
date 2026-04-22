import { useState } from "react";
import { chatAPI } from "../services/api";

export const useChat = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const sendQuery = async (query, language = "en") => {
    setLoading(true);

    try {
      const res = await chatAPI({ query, language });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return { sendQuery, loading, response };
};
