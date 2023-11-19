const exp=require('express');
const mongoose=require('mongoose');
mongoose.set('strictQuery',true);
// mongodb+srv://Prakash:<password>@cluster0.emqxvew.mongodb.net/?retryWrites=true&w=majority
const connectDB= ()=>{
    mongoose.connect("mongodb+srv://plsprakash2003:Surya_2003@cluster0.2yh1df7.mongodb.net/pro?retryWrites=true&w=majority&ssl=true"
    );
    console.log("connected");
}

module.exports=connectDB;
//mongodb://localhost:27017