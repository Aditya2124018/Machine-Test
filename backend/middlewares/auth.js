const jwt = require("jsonwebtoken")
require("dotenv").config()
exports.auth=async(req,res,next)=>{
    try {
        const bearerHeader = req.headers['authorization'];
if(! bearerHeader ){
    return res.status(401).json({
        success:false,
        message:"Unauthorised Access Blocked."
    })
}
else
{
    const bearerToken = bearerHeader.split(' ')[1];
    let data = await jwt.verify(bearerToken,process.env.JWT_SECRET);
    console.log(data)
}
       
      
        next()
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Something went wrong."
        })
    }
}