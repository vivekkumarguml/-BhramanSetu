const Booking = require("../models/booking");
const Listing = require("../models/listing");

module.exports.renderBookingForm = async (req, res) => {
  const { id } = req.params; // listingId
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("bookings/new", { listing });
};

module.exports.createBooking = async (req, res) => {
  const { id } = req.params; // listingId
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  
const { fromDate, toDate, numberOfPeople } = req.body;

const checkIn = new Date(fromDate);
const checkOut = new Date(toDate);
const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

if (nights <= 0) {
  req.flash("error", "Check-out date must be after check-in date!");
  return res.redirect(`/listings/${id}`);
}

const totalPrice = listing.price * numberOfPeople * nights;


const booking = new Booking({
  user: req.user._id,
  listing: listing._id,
  fromDate,
  toDate,
  numberOfPeople,
  totalPrice
});


  await booking.save();
  req.flash("success", "Booking confirmed!");
  res.redirect(`/bookings/view/${booking._id}`);

};

module.exports.showBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId)
    .populate("user")
    .populate("listing");

  if (!booking) {
    req.flash("error", "Booking not found!");
    return res.redirect("/listings");
  }

  res.render("bookings/show", { booking });
};
