const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync.js");
const User=require("../models/user.js");
const { array } = require("joi");
const passport = require("passport");
const { redirectUrl, isOwner } = require("../middleware.js");
const {signup,registerUser, login, logout, logoutPost}=require("../controllers/user.js");

//signup with get and post request
router.route("/signup").get(signup).post(redirectUrl,wrapAsync(registerUser));

//login route with get and post
router.route("/login").get( login).post(redirectUrl, passport.authenticate("local",
    { failureRedirect:"/login", failureFlash:true})
    ,logoutPost);

//logout
router.get("/logout",logout);


module.exports=router;


