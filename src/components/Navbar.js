import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate,NavLink } from 'react-router-dom'
function Navbar() {
    const user = localStorage.getItem("username")
    const navigate = useNavigate()
  return (
    <div className='flex justify-between p-3 bg-slate-100 rounded-b-lg'>
        <NavLink to="/home" className='text-black font-semibold'>Home</NavLink>
        
         <NavLink to="/dashboard" className='text-black font-semibold'>Employee List</NavLink>
        <div className='flex gap-5'>
        <div className='text-green-500 font-semibold'>Hello! {user}</div>|
        <button onClick={()=>{
            localStorage.clear()
            toast.success(`${user} Logged Out Successfully`)
            navigate("/")
            }} className='text-md  font-semibold text-red-500 rounded-md focus:outline-none'>Log Out</button>
        </div>
    </div>
  )
}

export default Navbar