const express =require("express");
const app =express();
const mongoose = require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const Review=require("./models/review.js");

const session=require("express-session");
const  flash=require("connect-flash");
const passport =require("passport");
const LocalStrategy= require("passport-local");
const User = require("./models/user.js")

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true }));


const sessionOption={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() +7 * 24 * 60 *60 *1000,
        maxAge:7 * 24 * 60 *60 *1000,
        httpOnly:true,
    },                  
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));  // authencate -> login or signup

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middle ware for success 
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    console.log(res.locals.success);
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.get("/demouser",async(req,res)=>{
    let fakeUser=new User({
        email:"student@gmail.com",
        username:"delta-student"
    });
    let registeredUser= await User.register(fakeUser,"helloworld");
    res.send(registeredUser);
})


const listingRouter=require("./routes/listing.js");
const reviewRouter =require("./routes/review.js");
const userRouter =require("./routes/user.js");

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);



// app.get("/testListing", async (req,res)=>{
//   let sampleListing = new Listing({
//     title:"My New Villa",
//     description:" Buy the beach ",       
//     price:1200,
//     location:"Calangute, Goa",
//     country:"India",
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");

// })

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"Page not Found!"));
// });

app.get("/",(req,res)=>{
    res.send("Hi , I am rooot");
});

app.use((err,req,res,next)=>{
    let {status=500, message="Something went wrong! "}=err;
    res.status(status).render("error.ejs",{message});
    //res.status(status).send(message);
})
app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});




