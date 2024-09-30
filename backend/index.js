const express = require("express")
const app = express()
require("dotenv").config()
const dbConnect = require("./config/dbConnect")
const router = require("./routes/routes")
const cors = require('cors')
const cookieParser = require("cookie-parser")


app.use(express.json())
app.use("/uploads",express.static("uploads"))
const corsOptions = {
    origin:'http://localhost:3001',
    methods:"GET, POST, PUT,DELETE"
}
app.use(cookieParser());
app.use(cors(corsOptions))
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log("App Listening at PORT "+PORT)
})

dbConnect()
app.use("/api",router)