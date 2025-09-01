const express = require("express");
const router = express.Router();

// Terms & Conditions
router.get("/terms", (req, res) => {
  res.render("policies/terms");
});

// Privacy Policy
router.get("/privacy", (req, res) => {
  res.render("policies/privacy");
});

// Cancellation & Refund Policy
router.get("/cancellation", (req, res) => {
  res.render("policies/cancellation");
});

// Contact Us
router.get("/contact", (req, res) => {
  res.render("policies/contact");
});

// Shipping Policy
router.get("/shipping", (req, res) => {
  res.render("policies/shipping");
});

module.exports = router;
