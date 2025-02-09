const express = require("express");
const {
  getImages,
  generateImage,
  getUserImages,
} = require("../controller/image.controller");
const router = express.Router();

router.post("/generate-image", generateImage);
router.get("/discover-image", getImages);
router.get("/images/:userId", getUserImages);
module.exports = router;
