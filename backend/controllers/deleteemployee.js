const Employee = require("../models/employee")
exports.deleteemployee = async(req,res)=>{
    try {const id = req.params['id']
        const response = await Employee.deleteOne({_id:id})
        res.status(200).json({
            success:true,
            data:response,
            message:"Employee Deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:true,
            error:error.message,
            message:"Employee can't be deleted."
         })
    }
}