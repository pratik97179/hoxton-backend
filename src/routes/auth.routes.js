const express = require("express");
const authController = require("../controllers/authController");
const {
    validateRegisterLoginBody,
    validateCheckEmailBody,
} = require("../middleware/validateAuthBody");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/check-email", validateCheckEmailBody, authController.checkEmail);
router.post("/register", validateRegisterLoginBody, authController.register);
router.post("/login", validateRegisterLoginBody, authController.login);

module.exports = router;
