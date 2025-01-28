const express = require("express");
const { getImages, generateImage } = require("../controller/image.controller");
const router = express.Router();

router.post("/generate-image", generateImage);
router.get("/discover-image", getImages);
module.exports = router;
