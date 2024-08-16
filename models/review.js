const mongoose=require("mongoose");


const reviewSchema=new mongoose.Schema({
    username:String,
    comment:String,
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
});

const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;
