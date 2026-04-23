import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { askPython } from "../../services/python.service.js";

export const chatController = asyncHandler(async (req, res) => {
  const { query } = req.body;

  const response = await askPython(query);

  return res.json(new ApiResponse(200, response));
});
