const exp=require('express');
const mongoose=require('mongoose');
mongoose.set('strictQuery',true);
// mongodb+srv://plsprakash2003:Surya_2003@cluster0.2yh1df7.mongodb.net/pro?retryWrites=true&w=majority&ssl=true
const connectDB= ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/mark"
    );
    console.log("connected");
}

module.exports=connectDB;
//mongodb://localhost:27017