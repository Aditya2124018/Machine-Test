const mongoose = require("mongoose")
const employee = new mongoose.Schema({
    emp_id:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        maxlength:10

    },
    designation:{
        type:String,
        enum:["HR","Manager","Sales"],
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","others"],
        required:true
    },
    course:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Employee", employee)