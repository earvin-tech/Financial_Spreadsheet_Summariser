const express = require("express");
const multer = require("multer");
const path = require("path");
const { handleUpload } = require("../controllers/uploadController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Store in memory - good for parsing before saving to DB or S3
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  /**
   *
   * @param request
   * @param file
   * @param cb
   */
  fileFilter: (request, file, cb) => {
    const allowed = [".csv", ".xlsx", ".xls"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(
        new Error("Only .csv, .xlsx, or .xls files are allowed"),
        false
      );
    }
    cb(null, true);
  },
});

// POST /api/upload
router.post("/", verifyToken, upload.single("file"), handleUpload);

module.exports = router;
