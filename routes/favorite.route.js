const express = require("express"); 
const { createFavorite, myFavorites, removeFromFavorite } = require("../controller/favorite.controller");
const router = express.Router();

router.post("/favorite", createFavorite);
router.get("/favorite/mine", myFavorites);
router.delete("/favorite/:imageId", removeFromFavorite);

module.exports = router;
