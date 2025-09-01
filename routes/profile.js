const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profiles");
const multer = require("multer");

const upload = multer({ dest: "public/uploads/" });

// Show profile
router.get("/", profileController.showProfile);

// Edit profile form
router.get("/edit", profileController.editProfileForm);

// Update profile (only phone + profileImage)
router.post("/edit", upload.single("profileImage"), profileController.updateProfile);

module.exports = router;
