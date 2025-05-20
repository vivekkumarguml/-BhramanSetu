const express=require("express");
const router=express.Router();    // this is the new line added  for seggegration in users and posts file 

//Index-users
router.get("/",(req,res)=>{
    res.send("GET for users");
});

//Show-users
router.get("/:id",(req,res)=>{
  res.send("GET for uses id");
});

//POST-users
router.post("/",(req,res)=>{
   res.send("POST for users");
});

//DELETE -users
router.delete("/:id",(req,res)=>{
    res.send("DELETE for user id");
});

module.exports=router;

