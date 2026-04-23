import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { env } from "../config/env.js";

export const callAI = async (payload) => {
  const res = await axios.post(
    `${process.env.PYTHON_SERVICE_URL}/chat`,
    payload,
    { timeout: 20000 },
  );
  return res.data;
};
