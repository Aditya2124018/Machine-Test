const Employee = require("../models/employee")
exports.createEmployee = async(req,res)=>{
    function date(){
        const date = new Date()
        return (`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`)
    }
    try {
        // const data = req.file
        // console.log(req.body.name)
        console.log(req.file)
        const {name,email,mobile,designation,gender,course} = req.body
        const image = req.file.filename
        if(!name || !email || !mobile || !designation || !gender || !course || !image){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            })
        }

        if(mobile.length > 10 || mobile.length < 10){
            return res.status(400).json({
                success:false,
                message:"A Mobile Number can have only Ten(10) Numbers."
            })
        }
        const employee_exists =await Employee.findOne({email:email})
        if(employee_exists){
            return res.status(400).json({
                success:false,
                message:"Choose a different Email, Employee already exists."
            })
        }
        const no_of_employees = await Employee.find()
        const emp_id = "Emp"+ ((no_of_employees.length)+1)
        const data = {
            emp_id:emp_id,
            name:name,
            email:email,
            mobile:mobile,
            designation:designation,
            gender:gender,
            course:course,
            image:image,
            createdAt:date()
        }
        
        const response = await Employee.create(data)
        
         res.status(200).json({
            success:true,
            data:response,
            message:"Employee Created Successfully"
         })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:true,
            error:error.message,
            message:"Employee Creation Failed."
         })
    }
}