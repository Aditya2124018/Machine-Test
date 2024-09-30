const Employee = require("../models/employee")
exports.getEmployees = async(req,res)=>{
    try {
        const response = await Employee.find({})
        res.status(200).json({
            success:true,
            data:response,
            message:"All employee's data fetched"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:true,
            error:error.message,
            message:"Employee's data can't be fetched."
         })
    }
}