const express=require("express");
const router=express.Router({mergeParams:true});
const Review=require("../models/review.js");
const wrapAsync=require("../util/wrapAsync.js");
const Listing =require("../models/listing");
const {reviewSchema}=require("../schema.js");
const { isLogged, isOwner ,isOwnerReview, isLoggedReview,validateReview} = require("../middleware.js");
const {addReview, deleteReview}=require("../controllers/review.js");

//addReview
router.post("/",isLoggedReview,validateReview,wrapAsync(addReview));
  
//delete review
router.delete("/:rid",isLoggedReview,isOwnerReview,wrapAsync(deleteReview));


module.exports=router;
