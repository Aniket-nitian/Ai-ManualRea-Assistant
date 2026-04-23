import { asyncHandler } from "../../utils/asyncHandler.js";
import { processFileService } from "../../services/upload.service.js";

export const uploadFile = asyncHandler(async (req, res) => {
  const result = await processFileService(req.file);

  res.status(200).json({
    success: true,
    message: "File uploaded & processed",
    data: result,
  });
});
