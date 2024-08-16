const Review=require("../models/review");
const Listing=require("../models/listing");

const addReview=async (req,res)=>{
    let {id}=req.params;
    let listing1=await Listing.findById(id);
    let {Rating,Comment}=req.body;
    console.log(req.body);
    let rew=new Review({
      username:req.user.username,
      comment:Comment,
      rating:Rating,   
      owner:req.user._id,
    });
    listing1.reviews.push(rew);
    rew.save();
    listing1.save();
    req.flash("super","Review was added");
    res.redirect(`/listings/${id}`);
}

const deleteReview=async (req,res)=>{
    
    
    let {id,rid}=req.params;
    let q=await Listing.findByIdAndUpdate(id ,{ $pull :{reviews:rid}},{new:true});
    await Review.findByIdAndDelete(rid);
    req.flash("super","Review was deleted");
    res.redirect(`/listings/${id}`);
  
    
}

module.exports={addReview,deleteReview}