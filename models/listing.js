// const mongoose=require("mongoose");
// const Schema= mongoose.Schema;


// const listingSchema =new Schema({
//     title:{
//         type:String,
//         required:true,
//     },
//     description:String,
//     image:{
//         filename:String,
//         url:{
//         default:"https://unsplash.com/photos/a-tree-on-a-beach-jyCXSA_LQO4",
//         set: (v) =>
//         v === "" ? "https://unsplash.com/photos/a-tree-on-a-beach-jyCXSA_LQO4":v,
//      },
//     price:Number,
//     location:String,
//     country:String,
// });

// const Listing= mongoose.model("Listing",listingSchema);
// module.exports=Listing;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review =require("./review.js");

const imageSchema = new Schema({
  filename: String,
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    set: (v) =>
      v === "" ? "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" : v,
  }
}, { _id: false }); // prevent _id for subdocuments

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image:{
    type:imageSchema,
    default:()=>({}),
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review"
    }
  ]
});

//momgoose middleware
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{ $in:listing.reviews }})
  }
});



const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
