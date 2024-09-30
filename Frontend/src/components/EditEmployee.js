import React,{useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import toast from 'react-hot-toast'
function EditEmployee() {
    const navigate = useNavigate()
    const editdata = JSON.parse(localStorage.getItem("edit"))
    console.log(editdata._id)
    const token = localStorage.getItem("token")
    const [image,setImage] = useState(editdata.image)
    const [formdata,setFormData] = useState({
       
        name:editdata.name,
        email:editdata.email,
        mobile:editdata.mobile,
        designation:editdata.designation,
        gender:editdata.gender,
        course_bca:(editdata.course === "BCA" ? true :false) ,
        course_bsc:(editdata.course === "BSC" ? true :false),
        course_mca:(editdata.course === "MCA" ? true :false)
    })
    
    function changeHandler(e){
        const {name, value, type, checked} = e.target
       
        setFormData({...formdata,[name]:((type === "checkbox") ? checked :value)})
    }
    function getCourse(){
        if(formdata.course_bca){
            return "BCA"
        }
        if(formdata.course_bsc){
            return "BSC"
        }
        if(formdata.course_mca){
            return "MCA"
        }
    }
   async function submitHandler(e){
        e.preventDefault()
        // const data = {...formdata,image}
        
        try {
           
            
            const updatedformData = new FormData()  
            updatedformData.append("image",image)
            updatedformData.append("name",formdata.name)
            updatedformData.append("email",formdata.email)
            updatedformData.append("mobile",formdata.mobile)
            updatedformData.append("designation",formdata.designation)
            updatedformData.append("gender",formdata.gender)
            updatedformData.append("course",getCourse())
            console.log({formdata,image})
            const response = await axios.post(`http://localhost:3000/api/updateemloyee/${editdata._id}`,updatedformData,{  headers: {
                'Authorization': 'Bearer ' + token
              }} )
            console.log(formdata)
            console.log(response)
            if(response.data.success){
                localStorage.removeItem("edit")
                toast.success(response.data.message)
                navigate("/dashboard")
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
        // setFormData({
        //      name:"",
        // email:"",
        // mobile:"",
        // designation:"HR",
        // gender:"",
        // course_bca:false,
        // course_bsc:false,
        // course_mca:false
    
        // })
        
    }
  return (
    <div className=' w-full flex flex-col justify-center items-center'>
        <div  className='w-full'><Navbar/></div>
        <h1 className='text-center mt-5 text-xl font-semibold'>Update Employee's Details</h1>
        <div className='mt-3'><img height="80px" width="80px" src={`http://127.0.0.1:3000/uploads/${editdata.image}`} alt="" className='rounded-full'/></div>
        <form onSubmit={submitHandler} className="h-full w-96 flex flex-col justify-center gap-2 mt-0 mb-14" encType='multipart/form-data'>
        <label htmlFor='name' className='text-md font-semibold'>Name</label>
        <input type="text" name="name" id='name' onChange={changeHandler} value={formdata.name} className="p-1 rounded-md border-b-2 shadow-inner shadow-gray-500 focus:outline-none"/>
        
        <label htmlFor='email' className='text-md font-semibold'>email</label>
        <input type="email" name="email" id='email' onChange={changeHandler} value={formdata.email} className="p-1 rounded-md border-b-2 shadow-inner shadow-gray-500 focus:outline-none"/>
       
        <label htmlFor='mobile' className='text-md font-semibold'>mobile</label>
        <input type="number" name="mobile" id='mobile' onChange={changeHandler} value={formdata.mobile} className="p-1 rounded-md border-b-2 shadow-inner shadow-gray-500 focus:outline-none"/>

        <label htmlFor='designation' className='text-md font-semibold'>designation</label>
        <select id='designation' name="designation" onChange={changeHandler} value={formdata.designation} className="p-1 rounded-md border-b-2 shadow-inner shadow-gray-500 focus:outline-none">
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
        </select>

        <label htmlFor='gender' className='text-md font-semibold'>Gender</label>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
        <input type='radio' name="gender" value="male" checked={formdata.gender === "male" ? true :false} onChange={changeHandler} id="male"/><label htmlFor='male'>Male</label> 
        </div>

        <div className='flex gap-2'>
        <input type='radio' name="gender" value="female" checked={formdata.gender === "female" ? true :false} onChange={changeHandler} id="female"/><label htmlFor='female'>Female</label> 
        </div>

        <div className='flex gap-2'>
        <input type='radio' name="gender" value="others" checked={formdata.gender === "others" ? true :false} onChange={changeHandler} id="others"/><label htmlFor='others'>Others</label> 
        </div>
        </div>

        <label className='text-md font-semibold'>Course</label>
        <div className='flex justify-between'>
        <div className='flex gap-2'>
        <label htmlFor='course-bca'>BCA</label>
<input type='checkbox' className=""
checked={formdata.course_bca}
onChange={changeHandler}
name="course_bca"
id="course-bca"/>
</div>
<div  className='flex gap-2'>
<label htmlFor='course-bsc'>BSC</label>
<input type='checkbox' className=""
checked={formdata.course_bsc}
onChange={changeHandler}
name="course_bsc"
id="course-bsc"/>
</div>
<div className='flex gap-2'>
<label htmlFor='course-mca'>MCA</label>
<input type='checkbox' className=""
checked={formdata.course_mca}
onChange={changeHandler}
name="course_mca"
id="course-mca"/>
</div>

</div>
    <label htmlFor='image' className='text-md font-semibold'>Image</label>
    <input type="file" accept='.png,.jpg' id="image" onChange={(e)=>{
        setImage(e.target.files[0])
    }}/>
        <button className= 'ml-[7rem] w-40 text-white font-semibold shadow-md shadow-blue-500 mt-2 p-2 rounded-md  bg-blue-400 focus:outline-none '>Update</button>
    </form>
    </div>
  )
}

export default EditEmployee