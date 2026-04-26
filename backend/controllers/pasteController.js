import Paste from "../models/Paste.js";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

// expiry helper
const getExpiryTime = (expiresIn) => {
  const now = new Date();

  switch (expiresIn) {
    case "10m":
      return new Date(now.getTime() + 10 * 60 * 1000);
    case "30m":
      return new Date(now.getTime() + 30 * 60 * 1000);
    case "1h":
      return new Date(now.getTime() + 60 * 60 * 1000);
    case "3h":
      return new Date(now.getTime() + 3 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() + 10 * 60 * 1000);
  }
};

export const createPaste = async (req, res) => {
  try {
    const { type, content, expiresIn, password } = req.body;

    const pasteId = nanoid(8);
    const expiresAt = getExpiryTime(expiresIn);

    let finalContent = content;
    let isFile = false;

    // 📂 CLOUDINARY FILE HANDLING
    if (req.file) {
      finalContent = req.file.path; // Cloudinary URL
      isFile = true;
    }

    // 🔒 Password hashing
    let hashedPassword = null;
    let isProtected = false;

    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
      isProtected = true;
    }

    const newPaste = new Paste({
      pasteId,
      type,
      content: finalContent,
      isFile,
      expiresAt,
      isProtected,
      password: hashedPassword,
      userId: req.user?._id,
    });

    await newPaste.save();

    res.status(201).json({
      message: "Paste created successfully 🚀",
      pasteId,
      url: finalContent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getPaste = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.query;

    const paste = await Paste.findOne({ pasteId: id });

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    // ⏳ expiry check
    if (new Date() > paste.expiresAt) {
      await Paste.deleteOne({ pasteId: id });
      return res.status(410).json({ message: "Paste expired" });
    }

    // 🔒 password check
    if (paste.isProtected) {
      if (!password) {
        return res.status(401).json({ message: "Password required" });
      }

      const match = await bcrypt.compare(password, paste.password);

      if (!match) {
        return res.status(403).json({ message: "Incorrect password" });
      }
    }

    // 🚫 never send password
    const { password: _, ...safePaste } = paste.toObject();

    res.json(safePaste);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserPastes = async (req, res) => {
  try {
    const pastes = await Paste.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(pastes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePaste = async (req, res) => {
  try {
    const { id } = req.params;
    const paste = await Paste.findOne({ pasteId: id });

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    if (paste.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Paste.deleteOne({ pasteId: id });
    res.json({ message: "Paste removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};