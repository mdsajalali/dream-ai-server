const express = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  deleteUser,
} = require("../controller/user.controller");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
module.exports = router;
