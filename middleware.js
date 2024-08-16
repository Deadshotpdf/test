const Listing = require("./models/listing");
const Review=require("./models/review");
const {reviewSchema,listingSchema}=require("./schema.js");
const ExpressError=require("./util/ExpressError.js");
const isLogged=(req,res,next)=>{
    if(!req.isAuthenticated()){
      req.session.redirect=req.originalUrl;
      req.flash("error","You must be logged in");
      res.redirect("/login");
    }else
    {
        next();
    }
} 

const isLoggedReview=(req,res,next)=>{
    if(!req.isAuthenticated()){
      let {id}=req.params
      req.session.redirect=`/listings/${id}`;
      req.flash("error","You must be logged in");
      res.redirect("/login");
    }else
    {
        next();
    }
} 
const redirectUrl=(req,res,next)=>{
  if(req.session.redirect){
  res.locals.redirect=req.session.redirect;  
}else{
  res.locals.redirect="/listings";
}
  next();
}


const isOwner= async(req,res,next)=>{
 let {id}=req.params;
 let listing= await Listing.findById(id).populate("owner");
 if(!listing.owner._id.equals(req.user._id)){
  req.flash("error","you are not the owner");
  
  res.redirect("/listings");
 }
 else
 next();

}

const isOwnerReview= async(req,res,next)=>{
  let {id,rid}=req.params;
  let review=await Review.findById(rid);
  if(req.user!=null&&req.user._id.equals(review.owner._id)){
    next();
  } else
  {
    req.flash("error","Your are not the owner");
  res.redirect(`/listings/${id}`);
  }
  
  

}

const validateListing=(req,res,next)=>{
  const {error}= listingSchema.validate(req.body);
  
  if(error){
    throw new ExpressError(404,error.message);
  }else{
    next();
  }
}


const validateReview=(req,res,next)=>{
  const {error}= reviewSchema.validate(req.body);
  
  if(error){
    throw new ExpressError(404,error.message);
  }else{
    next();
  }
}

module.exports={isLogged,redirectUrl,isOwner,isOwnerReview, isLoggedReview, validateListing,validateReview};
