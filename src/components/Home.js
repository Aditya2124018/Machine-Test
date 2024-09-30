import React, { useEffect } from 'react'
import Navbar from './Navbar'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
function Home() {
    const user = localStorage.getItem("username")
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(()=>{
        if(!token){
            toast.error("You are not Authorised for this Operation.")
            navigate("/")
        }
        // eslint-disable-next-line
    },[])
  return (
    <div >
        <Navbar/>
        <h1 className='h-[80vh] flex justify-center items-center text-2xl  font-semibold'>

        Welcome to Admin Panel {user}
    </h1>
    </div>
  )
}

export default Home