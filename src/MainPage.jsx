import React, { useEffect, useState } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import ParentOprate from "./Components/Multipage Profile/ParentOprate";
import SignupDetails from "./Components/SignupDetails";
import LogOut from "./Components/LogOut";

const MainPage = () => {
   let user = JSON.parse(localStorage.getItem("LoginData"))
   
   return (
      <> 
         {user &&
            <Navbar />
         }
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/SignupDetails" element={<SignupDetails />} />
            <Route path="/profile" element={<ParentOprate />} />
            <Route path="/logout" element={<LogOut />} />
         </Routes>
      </>
   )
}

export default MainPage