import fs from "fs";
import { uploadToCloudinary } from "./cloudinary.service.js";
import { callAI } from "./python.service.js";

export const processFileService = async (file) => {
  if (!file) {
    throw new Error("File is required");
  }

  const fileUrl = await uploadToCloudinary(file.path);

  fs.unlinkSync(file.path);

  const response = await callAI({
    file_url: fileUrl,
  });

  return {
    fileUrl,
    aiResponse: response,
  };
};
