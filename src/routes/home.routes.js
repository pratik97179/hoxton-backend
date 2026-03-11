const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", requireAuth, homeController.home);

module.exports = router;
