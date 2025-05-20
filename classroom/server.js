const express =require("express");
const app =express();
const users= require("./routes/user.js");
const posts= require("./routes/posts.js");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions ={
  secret:"mysupersecretstring",
  resave:false,
  saveUninitialized:true,
}

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

//=============== STORING AND USING SESSIONS INFO =======================

app.get("/register",(req,res)=>{
  let {name="anonymous"}=req.query;
  req.session.name=name;

  if(name === "anonymous"){
    req.flash("error","user not registered");
  }else{
    req.flash("success","user registered successfully!");          // declaring flash
  }

  console.log(req.session.name);
  res.redirect("/hello")
});

app.get("/hello",(req,res)=>{
  //res.send(`hello ${req.session.name}`);
  res.render("page.ejs",{name: req.session.name});   //passing flash message
})


//==================== SAVING RESPONSE (COUNT ) TO SERVER SIDE  WITH IN PAGE ==========================
// app.get("/reqcount",(req,res)=>{
//   if(req.session.count){
//     req.session.count++;
//   }else{
//     req.session.count=1;
//   }
//   res.send(`You send a request ${req.session.count} times`);
// })

// app.get("/test",(req,res)=>{
//   res.send("Test successful!!");
// });





app.listen(3000,()=>{
    console.log("server is listening to 3000");
});


//===================================  COOKIES CONCEPT================================

// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));


// // getting signed cookies
// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-In","India",{signed:true});
//     res.send("signed cookie sent");
// })

// // verifying the cookies
// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies",(req,res)=>{
//    res.cookie("great","Namastey");
//    res.cookie("madeIn","India");
//    res.send("Some cookies get added in your page!!!");
// });

// app.get("/greet",(req,res)=>{
//     let {name="anonymus"}=req.cookies;
//     res.send(`Hi,${name}`);
// })


// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi!! I am root!");
// })

// app.use("/users",users);
// app.use("/posts",posts);