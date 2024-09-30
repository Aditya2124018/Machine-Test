const mongoose = require("mongoose")
const user = new mongoose.Schema({
    sno:{
        type:Number,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("User", user)