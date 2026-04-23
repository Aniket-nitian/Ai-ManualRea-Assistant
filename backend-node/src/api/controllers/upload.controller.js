import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadToCloudinary } from "../../services/upload.service.js";
import { sendFileToPython } from "../../services/python.service.js";

export const uploadController = asyncHandler(async (req, res) => {
  const filePath = req.file.path;

  const fileUrl = await uploadToCloudinary(filePath);

  await sendFileToPython(fileUrl);

  return res.json(new ApiResponse(200, { fileUrl }, "File processed"));
});
