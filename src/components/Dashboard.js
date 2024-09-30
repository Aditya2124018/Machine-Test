import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import {FaSearch} from "react-icons/fa"
import {FaEdit} from "react-icons/fa"
import {FaTrash} from "react-icons/fa"
import toast from 'react-hot-toast'
 function Dashboard() {
    const navigate = useNavigate()
    
    const token = localStorage.getItem("token")
    const [empdata,setEmpData] = useState([])
    const [searchinput,setSearchInput] = useState("")
    const [render,setRender] = useState(false)
    
        
   async function dashboard(){
       try {
        if(!token){
            toast.error("You are not Authorised for this Operation.")
            navigate("/")
        }
        const response = await axios.get("http://localhost:3000/api/getemployees",
          {  headers: {
            'Authorization': 'Bearer ' + token
          }} )
        console.log(response.data.data)
        setEmpData(response.data.data)
    
       
       } catch (error) {
        
        console.log(error.response.data)
       }
    }
    
    useEffect(()=>{
        dashboard()
        // eslint-disable-next-line
    },[render])
   
  return (
    <div>
        <Navbar/>
        
        <div className='flex justify-between mx-6 items-center'>
       <NavLink to="/addemployee" className='text-green-500 font-semibold'>Create Employee</NavLink>
       <div className='flex gap-5 items-center'>
        <h1  className='text-black font-semibold'>Total Employee's Count : {empdata.length}</h1>
       <div className='w-64 relative mt-2'>
       <input onChange={(e)=>{
            setSearchInput(e.target.value)
            if(e.target.value.length <1){
                dashboard()
            }
            const results = empdata.filter((emp)=>{
                return(
                    emp.name.toLowerCase().includes(searchinput)
                )
            })
            console.log(results)
            setEmpData(results)
            }} placeholder='search...' className="w-full p-1 pl-3 rounded-full border-b-2 shadow-inner shadow-gray-500 focus:outline-none"/>
            <FaSearch className='absolute top-2 right-3'/>
       </div>
       </div>
       </div>
        <div className=' flex justify-center mb-5 text-xl font-semibold'>Employee List</div>
        {
            (empdata.length < 1)?(<h1 className='text-xl font-semibold flex justify-center mt-8'>Employees Not Found</h1>):
        
       
        <table className='border-2 w-full'>
            
            <th className='border-2'>Unique ID</th>
            <th className='border-2'>Image</th>
            <th className='border-2'>Name</th>
            <th className='border-2'>Mobile</th>
            <th className='border-2'>Email</th>
            <th className='border-2'>Designation</th>
            <th className='border-2'>Gender</th>
            <th className='border-2'>Course</th>
            <th className='border-2'>Created Date</th>
            <th className='border-2'>Action</th>
            
            <tbody>
                {
                   empdata.map((emp)=>{
                        return <tr key={emp._id}>

                            {/* <td>{emp._id}</td> */}
                            <td className='border-2 text-center'>{emp.emp_id}</td>
                            <td className='border-2 text-center flex justify-center'><img height="60px" width="60px" src={`http://127.0.0.1:3000/uploads/${emp.image}`} alt="" className='rounded-full'/></td>
                            <td className='border-2 text-center'>{emp.name}</td>
                            <td className='border-2 text-center'>{emp.mobile}</td>
                            <td className='border-2 text-center'>{emp.email}</td>
                            <td className='border-2 text-center'>{emp.designation}</td>
                            <td className='border-2 text-center'>{emp.gender}</td>
                            <td className='border-2 text-center'>{emp.course}</td>
                            <td className='border-2 text-center'>{emp.createdAt}</td>
                            <td className='border-2 text-center  '>
                                <button className='text-blue-500 mx-1'
                                onClick={()=>{
                                    localStorage.setItem("edit",JSON.stringify(emp))
                                    navigate(`/editemployee`)
                                }}
                                ><FaEdit/></button>
                                <button className='text-red-500 mx-1'
                                onClick={async()=>{
                                    try {
                                        const response =await axios.delete(`http://localhost:3000/api/deleteemployee/${emp._id}`, {  headers: {
                                            'Authorization': 'Bearer ' + token
                                          }})
                                        toast.success(response.data.message)
                                        setRender(!render)
                                    } catch (error) {
                                        toast.error(error.response.data.message)
                                    }
                                }}
                                > <FaTrash/></button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>}
    </div>
  )
}

export default Dashboard