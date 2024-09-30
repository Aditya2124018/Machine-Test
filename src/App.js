import React from "react";
import SignupForm from "./components/SignupForm.js";
import LoginForm from "./components/LoginForm";
import { Routes,Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import AddEmployee from "./components/AddEmployee.js";
import EditEmployee from "./components/EditEmployee.js";
import Home from "./components/Home.js";
const App = () => {
  return <div className="h-[100vh] w-full">
    
     <Routes>
      <Route path="/signup" element={<SignupForm/>}/>
      <Route path="/" element={<LoginForm/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/addemployee" element={<AddEmployee/>}/>
      <Route path="/editemployee" element={<EditEmployee/>}/>
     </Routes>
  </div>;
};

export default App;
