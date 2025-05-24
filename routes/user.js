const express =require("express");
const router =express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const {saveRedirectUrl}= require("../middleware.js");

// wrapAsync function to handle async errors
//====================== added by me====================
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}
// =====================================================

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res) => {
  try{
    let { username,email,password }=req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{                          // login --> automatically login to the web while signup no need to login again
      if(err){                                                 // login --> passport functanolity
        return next(err);
      }
    req.flash("success","Welcome to BhramanSetu!");
    res.redirect("/listings");
    })
  }catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
  }
}));

router.get("/login",(req,res)=>{
  res.render("users/login.ejs");
})

router.post("/login", 
  saveRedirectUrl,      
  passport.authenticate('local', { 
    failureRedirect: "/login",
  failureFlash:true }),

 async(req,res)=>{
  req.flash("success","Welcome back to BhramanShetu!!");
  let redirectUrl=res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
 }
)

router.get("/logout",(req,res,next)=>{
req.logout((err)=>{
  if(err){
     return next(err);
  }
  req.flash("success","you are logged out !!");
  res.redirect("/listings");
})
});

module.exports = router;