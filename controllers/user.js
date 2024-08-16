const User=require("../models/user");

const signup=(req,res)=>{
    res.render("user/signup.ejs");
};


const registerUser=async(req,res)=>{
    try{
       
        let {username,email,password}=req.body;
        const user1=new User({ username,email});
        let RegisteredUser= await User.register(user1,password); 
        req.login(RegisteredUser,(err)=>{
            if(err){
                next(err)
            }else{
                req.flash("super","Welcome to WanderLust");
                res.redirect(res.locals.redirect);
            }
        }) 
    }
    catch(er){
        req.flash("error",er.message);
        res.redirect("/signup");
    }
};

const login=(req,res)=>{
    res.render("user/login.ejs");
};

const logout=async(req,res,next)=>{
  await  req.logout((err)=>{
        if(err)
        next(err);
   });
   req.flash("super","you are logged out");
   res.redirect("/listings");
};

const logoutPost=async(req,res)=>{
    req.flash("super","You are logged in sucessfully!");
    res.redirect(res.locals.redirect);
};

module.exports={signup,registerUser,login,logout,logoutPost};