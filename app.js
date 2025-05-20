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


// middle ware for success 
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    console.log(res.locals.success);
    res.locals.error=req.flash("error");
    next();
})


const listings=require("./routes/listing.js");
const reviews =require("./routes/review.js");

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);



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




