const mongoose= require("mongoose");
const {Schema}= mongoose;
const userSchema= new Schema({
    username:{
        type: String,
    },
    email:{
        type:String,
        required:true,
        unique: false,
        max:50,
    },
    password:{
        type:String,
        required:true,
        min:2,
    }
});

// const User=mongoose.model("Users",userSchema);
// User.createIndexes();
module.exports=mongoose.model("Users",userSchema);