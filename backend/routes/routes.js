const express = require("express")
const router = express.Router()
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        return cb(null,'./uploads')
    },
    filename:function (req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

const {signup}  = require("../controllers/signup")
const {login}  = require("../controllers/login")
const {auth}  = require("../middlewares/auth")
const {dashboard} = require("../controllers/dashboard")
const {createEmployee} = require("../controllers/createEmployee")
const {getEmployees} = require("../controllers/getEmployees")
const {deleteemployee} = require("../controllers/deleteemployee")
const {updateemployee} = require("../controllers/updateemployee")



router.post("/signup", signup)
router.post("/login", login)
router.get("/dashboard",auth,dashboard)
router.post("/createemployee",auth,upload.single("image"),createEmployee)
router.get("/getemployees",auth,getEmployees)
router.delete("/deleteemployee/:id",auth,deleteemployee)
router.post("/updateemloyee/:id",auth,upload.single("image"),updateemployee)
module.exports = router