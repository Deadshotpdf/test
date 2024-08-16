const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const wrapAsync = require("../util/wrapAsync.js");
const ExpressError = require("../util/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLogged, isOwner, validateListing } = require("../middleware.js");
const { index, newListing, showListing, createNewListing, editListing, udpateListing, deleteListing } = require("../controllers/listings.js");

const multer = require('multer');
const { cloudinary, storage } = require("../cloudConfig.js")

const upload = multer({ storage });

//create new listing   
router.get("/new", isLogged, newListing);
router.route("/").get(index).
  //post(upload.single("image"), (req, res) => {
  //res.send(req.file.path);
  //});
  post(upload.single("image"), validateListing, wrapAsync(createNewListing));
//show listing delete listing and update listing
router.route("/:id").get(showListing).delete(isLogged, isOwner, wrapAsync(deleteListing)).put(validateListing, isOwner, wrapAsync(udpateListing));
//edit listing
router.get("/:id/edit", isLogged, isOwner, wrapAsync(editListing));
module.exports = router;



