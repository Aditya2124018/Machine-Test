const User = require("../models/user")
const bcrypt = require("bcrypt")
exports.signup = async(req,res)=>{
    try {
        const {username, password} = req.body

        if(!username || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            })
        }

        const user_exists = await User.findOne({userName:username})
        if(user_exists){
            return res.status(400).json({
                success:false,
                message:"Choose a different UserName, user already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const no_of_users= await User.find()
        const sno = (no_of_users.length) + 1
        const data = {
            sno:sno,
            userName:username,
            password:hashedPassword
        }
        const response = await User.create(data)
        res.status(200).json({
            success:true,
            data:response,
            message:"User Signedup Successfully."
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:true,
            error:error.message,
            message:"User SignUp Failed."
        })
    }
}