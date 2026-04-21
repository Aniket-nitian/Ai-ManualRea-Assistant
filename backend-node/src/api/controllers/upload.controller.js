import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { processFileService } from "../../services/upload.services.js";

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "File is required");
  }

  const fileUrl = req.file.path;

  const data = await processFileService(fileUrl);

  return res
    .status(200)
    .json(new ApiResponse(200, data, "File processed successfully"));
});
