import { sendToPython } from "./python.services.js";

export const processFileService = async (filePath) => {
  return await sendToPython(filePath);
};
