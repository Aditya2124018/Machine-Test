import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function LoginForm() {
    const navigate = useNavigate()
    const [formdata,setFormData] = useState({
        
        username:"",
        password:""

    })
    let name,value
    function changeHandler(e){
        name=e.target.name
        value=e.target.value
        setFormData({...formdata,[name]:value})
    }
    async function submitHandler(e){
        e.preventDefault()
        console.log(formdata)
        try {
            const response =await axios.post("http://localhost:3000/api/login",formdata)
            console.log(response.data)
            localStorage.setItem("username",response.data.user)
            localStorage.setItem("token",response.data.token)
            if(response.data.success){  
                toast.success(response.data.message)
                navigate("/home")
            }
            
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
        setFormData({
            
            username:"",
            password:""
    
        })
    }

   
  return (
      <div className='h-[80vh] w-full flex flex-col justify-center items-center'>  
      <h1 className='text-center mb-10 text-xl font-semibold'>Login Panel</h1>  
      <form onSubmit={submitHandler} className="h-64 w-96 flex flex-col justify-center gap-2 ">
        <label htmlFor='username' className='text-lg font-semibold'>Username</label>
        <input type="text" name="username" id='username' onChange={changeHandler} value={formdata.username} className="p-2 rounded-md border-b-2 shadow-inner shadow-gray-500 focus:outline-none"/>
        <label htmlFor='password' className='text-lg font-semibold'>Password</label>
        <input type="password" name="password" id='password' onChange={changeHandler} value={formdata.password} className="p-2 rounded-md border-b-2 shadow-inner shadow-gray-500 focus:outline-none"/>
        <button className= 'ml-[7rem] w-40 text-white font-semibold shadow-md shadow-green-500 mt-2 p-2 rounded-md bg-green-400 focus:outline-none'>Submit</button>
    </form>
        </div>
  )
}

export default LoginForm