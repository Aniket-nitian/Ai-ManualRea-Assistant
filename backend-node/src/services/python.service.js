import axios from "axios";

const PYTHON_URL = "http://127.0.0.1:8000/api";

export const sendFileToPython = async (fileUrl) => {
  try {
    const res = await axios.post(`${PYTHON_URL}/upload-url`, {
      file_url: fileUrl,
    });

    return res.data;
  } catch (error) {
    console.log("PYTHON ERROR:", error.response?.data);
    throw error;
  }
};

export const askPython = async (query) => {
  const res = await axios.post(`${PYTHON_URL}/ask`, {
    query,
  });

  return res.data;
};
