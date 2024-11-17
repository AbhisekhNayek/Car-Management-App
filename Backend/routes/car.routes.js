const express = require("express");
const {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
  searchCars,
} = require("../controllers/car.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).array("images", 10);

router.post("/", authMiddleware, upload, createCar);
router.get("/", authMiddleware, getCars);
router.get("/search", authMiddleware, searchCars);
router.get("/:id", authMiddleware, getCar);
router.put("/:id", authMiddleware, upload, updateCar);
router.delete("/:id", authMiddleware, deleteCar);

module.exports = router;
