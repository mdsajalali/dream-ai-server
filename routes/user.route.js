const express = require("express");
const {
  createUser,
  loginUser,
  getUsers,
} = require("../controller/user.controller");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", getUsers);
module.exports = router;
