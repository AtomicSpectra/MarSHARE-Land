import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createPaste,
  getPaste,
  getUserPastes,
  deletePaste,
} from "../controllers/pasteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Optional auth for creation
const optionalProtect = (req, res, next) => {
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
};

// 🔥 file upload + text support
router.post("/create", optionalProtect, (req, res, next) => {
  const uploadSingle = upload.single("file");
  uploadSingle(req, res, (err) => {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(500).json({ error: "Upload failed: " + err.message });
    }
    next();
  });
}, createPaste);

router.get("/my-pastes", protect, getUserPastes);
router.get("/:id", getPaste);
router.delete("/:id", protect, deletePaste);

export default router;