import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "manual-ai",
      resource_type: "raw",
      use_filename: true,
      unique_filename: false,
    };
  },
});

const upload = multer({ storage });

export default upload;
