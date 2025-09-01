const User = require("../models/user");

// Show profile
module.exports.showProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.render("profile/show", { user });
};

// Edit form
module.exports.editProfileForm = (req, res) => {
  res.render("profile/edit", { user: req.user });
};

// Update profile (only phone + profileImage)
module.exports.updateProfile = async (req, res) => {
  const { phone } = req.body;
  let profileImage = req.user.profileImage;

  // if user uploaded a new image
  if (req.file) {
    profileImage = `/uploads/${req.file.filename}`;
  }

  await User.findByIdAndUpdate(req.user._id, {
    phone,
    profileImage
  });

  req.flash("success", "Profile updated successfully!");
  res.redirect("/profile");
};
