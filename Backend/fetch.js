const jwt=require('jsonwebtoken');
const jwt_s="surya";
const fetchUser= async (req,res,next)=>{
    //get user from token
    const token=req.header('jwtData');
    //auth-token
    if(!token){
        res.status(400).json({error: "not a proper token"});
    }
    try{
        const data=jwt.verify(token,jwt_s);
        req.user=data.user;
     //  res.send(user);      //why .send(),.json() is not working
        next();     // what is the purpose of next
       // res.json({user});
    }
    catch(error){
        res.status(401).json({error:"authentic problem"});
    }
}

module.exports=fetchUser;