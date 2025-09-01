const express = require("express");
const router = express.Router({ mergeParams: true });
const bookings = require("../controllers/bookings");
const { isLoggedIn } = require("../middleware");

// New booking form
router.get("/:id/book", isLoggedIn, bookings.renderBookingForm);

// Create booking
router.post("/:id/book", isLoggedIn, bookings.createBooking);

// Show booking details
router.get("/view/:bookingId", isLoggedIn, bookings.showBooking);

module.exports = router;
