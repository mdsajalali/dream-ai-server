const express = require("express");
const { createUser, getUsers } = require("../controller/user.controller");
const router = express.Router();

// user route
router.post("/create-user", createUser);
router.get("/users", getUsers);

module.exports = router;
