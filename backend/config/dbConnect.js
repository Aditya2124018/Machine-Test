const mongoose = require("mongoose")
require("dotenv").config()
const dbConnect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB Connection Success.")
    })
    .catch((e)=>{
        console.log("DB Connecton Failed."+e)
    })
}
module.exports = dbConnect