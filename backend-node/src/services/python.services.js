import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { env } from "../config/env.js";

export const sendToPython = async (fileUrl) => {
  const response = await axios.post(`${env.PYTHON_SERVICE_URL}/process`, {
    file_url: fileUrl,
  });

  return response.data;
};
