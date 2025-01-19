const express = require("express");
const { getUser, createUser, getUserById } = require("../controllers/userController");

const router = express.Router();

router.get("/get-user", getUser);
router.get("/get-user/:userId", getUserById); // Add this route
router.post("/create-user", createUser);

module.exports = router;