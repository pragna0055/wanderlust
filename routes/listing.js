const express = require("express");
const mongoose=require("mongoose");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer = require("multer"); 
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

const validateId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid Listing ID");
  }
};

// NEW
router.get("/new",isLoggedIn,listingController.renderNewForm);

router 
.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn ,
 upload.single("listing[image]"),
 validateListing,
  wrapAsync(listingController.createdListing)
);//index and create


router//show.Update,delete
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedIn ,
  upload.single("listing[image]"),
  isOwner,
  validateListing,
  wrapAsync(listingController.renderUpdateForm)
)
.delete(
  isLoggedIn ,
  isOwner,
   wrapAsync(listingController.destroyListing));

// EDIT
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm));


module.exports = router;