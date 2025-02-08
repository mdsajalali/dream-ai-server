const express = require("express");
const {
  createFavorite,
  myFavorites,
  removeFromFavorite,
} = require("../controller/favorite.controller");
const { protect } = require("../controller/auth.controller");
const router = express.Router();

router.post("/create-favorite", protect, createFavorite);
router.get("/my-list", protect, myFavorites);
router.delete("/remove-favorite/:imageId", protect, removeFromFavorite);
module.exports = router;
