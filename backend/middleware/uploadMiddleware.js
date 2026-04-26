import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// 🔥 Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "marshare_land",
    resource_type: "auto", // supports images, pdf, video, audio
  },
});

// Multer setup
const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit
  },
});

export default upload;