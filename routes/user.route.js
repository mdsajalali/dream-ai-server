const express = require("express");
const { createUser, getUsers, loginUser } = require("../controller/user.controller");
const router = express.Router();

// user route
router.post("/create-user", createUser);
router.post("/login", loginUser);
router.get("/users", getUsers);

module.exports = router;
