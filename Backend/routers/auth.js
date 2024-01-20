const express=require('express');
const { body, validationResult } = require('express-validator');
const User=require('../user');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fetchuser=require('../fetch');
const jwt_s="surya";

// user register
router.post('/user',[
    body('username').isLength({min:3}),
    body('email').isLength({min:2}),
    body('password').isLength({min:3})
],async (req,res)=>{
  console.log(req);
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send("please try to login with error box...");
    }
    try{
    //check the user email is vaildate or not 
    let user=await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).send("please try to login user error...");
    }

    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
   
    // const user=User(req.body);    //this two lines are used to simply check the application with backend
    // user.save();
     user=await User.create({
      username: req.body.username,
      email:req.body.email,
      password: secPass,
    });
    const data={
      user:{
        id:user.id
      }
     }
     const jwtData=jwt.sign(data,jwt_s);
     res.json({jwtData});
    }
    catch(error){
         console.log(error.message);
    }
   // res.json(user);
});

//for login
router.post('/login',[
  body('email','Enter a Correct Email').isEmail(),
  body('password','Password cnt blank').exists(),
],async (req,res)=>{
  let sucess=false;
  //check for possible errors 
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try{
  let user=await User.findOne({email});
  if(!user){
    return res.status(400).send("please try to login with correct credentials...");
  }
 
  const passwordComp=bcrypt.compare(password,user.password); //compare the given password with the found password in the database
  //console.log(passwordComp);
  if(!passwordComp){
    sucess=false;
    return res.status(400).send("please try to login with correct credentials");
  }
  else{
    const data={
      user:{
        id:user.id
      }
     }
  
     const jwtData=jwt.sign(data,jwt_s);
     sucess=true;
     res.json({sucess,jwtData});
  }
   
   

}
catch(error){
  res.status(500).send("some error occured");
}
});

router.get('/getuser', fetchuser,  async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports=router;

