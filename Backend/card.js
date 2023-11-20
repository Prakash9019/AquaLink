const mongoose= require("mongoose");
const {Schema}= mongoose;
const Images = [
    { image: require("./flood.png") },
];
const userSchema= new Schema({
    coordinate:{
        latitude:{
            type:Number,
        },
        longitude:{
            type:Number,
        }
    },
    title:{
        type:String,
        required:true,
        unique: false,
        max:50,
    },
    description:{
        type:String,
        required:true,
        min:2,
    },
    image:{
        type:Images[0].image,
    },
    rating:{
        type:Number,
    },
    review:{
        type:Number,
    },
    
});


//from medical.js
// user:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'             // works as foriegn key for the user.js file
// },
// name: String,
// img:
// {
//     data: Buffer,
//     contentType: String
// }

// coordinate: {
//     latitude: 22.6345648,
//     longitude: 88.4377279,
//   },
//   title: "Second Amazing Food Place",
//   description: "This is the second best food place",
//   image: Images[1].image,
//   rating: 5,
//   reviews: 102,

// const User=mongoose.model("Users",userSchema);
// User.createIndexes();
module.exports=mongoose.model("Users",userSchema);