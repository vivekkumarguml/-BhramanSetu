const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose =require("passport-local-mongoose");

const userSchema =new Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
     profileImage: {
    type: String, 
    default: "/images/default-profile.png"
  },
   phone: {
    type: String
  }
});


userSchema.plugin(passportLocalMongoose);  // it will add username ,hascode and salting automatically 

module.exports = mongoose.model('User', userSchema);