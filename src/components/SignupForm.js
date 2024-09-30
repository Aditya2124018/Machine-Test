import React,{useState} from 'react'
import axios from 'axios'

function SignupForm() {
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
    function submitHandler(e){
        e.preventDefault()
        console.log(formdata)
        sendData(formdata)
        setFormData({
            username:"",
           
            password:""
    
        })
    }

    async function sendData(formdata){
        try {
            const response =await axios.post("http://localhost:3000/api/signup",formdata)
            console.log(response.data)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
  return (
    <div className='h-[80vh] w-full flex flex-col justify-center items-center'>
    <h1 className='text-center mb-10 text-xl font-semibold'>Signup Panel</h1>   
     <form onSubmit={submitHandler}  className="h-64 w-96 flex flex-col justify-center gap-2 ">
        <label htmlFor='username' className='text-lg font-semibold'>UserName</label>
        <input type="text" name="username" id='username' onChange={changeHandler} value={formdata.username} className="p-2 rounded-md border-b-2 shadow-inner shadow-gray-500 focus:outline-none"/>
        
        <label htmlFor='password' className='text-lg font-semibold'>Password</label>
        <input type="password" name="password" id='password' onChange={changeHandler} value={formdata.password} className="p-2 rounded-md border-b-2 shadow-inner shadow-gray-500 focus:outline-none"/>
       
        <button className= 'ml-[7rem] w-40 text-white font-semibold shadow-md shadow-green-500 mt-2 p-2 rounded-md bg-green-400 focus:outline-none'>Submit</button>
    </form>
    </div>

  )
}

export default SignupForm