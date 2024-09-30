const Employee = require("../models/employee")
exports.updateemployee = async(req,res)=>{
   
    function getImage(){
      
        if(req.file){
            const image = req.file.filename
             return image
        }else{
            const image = req.body.image
            return image
        }
    }
      
    try {
        // const data = req.file
        // console.log(req.body.name)
        const id = req.params['id']
        const {name,email,mobile,designation,gender,course} = req.body

        if(name === undefined || email === undefined  || mobile === undefined  || designation === undefined || gender === undefined  || course === 'undefined' ){
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
        const employee_exists =await Employee.find({email:email})
        if(employee_exists.length > 1){
            return res.status(400).json({
                success:false,
                message:"Choose a different Email, Employee already exists."
            })
        }
        const data = {
          
            name:name,
            email:email,
            mobile:mobile,
            designation:designation,
            gender:gender,
            course:course,
            image:getImage()
            
        }
        
        const response = await Employee.findByIdAndUpdate(id, data)
        
        console.log(data)
         res.status(200).json({
            success:true,
            data:response,
            message:"Employee Updated Successfully"
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