import React, { useEffect, useState } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import ParentOprate from "./Components/Multipage Profile/ParentOprate";
import SignupDetails from "./Components/SignupDetails";
import LogOut from "./Components/LogOut";
import PageNotFound from "./Components/PageNotFound";

const MainPage = () => {
   let user = JSON.parse(localStorage.getItem("LoginData"))
   // console.log("userrrrr", user )
   return (
      <> 
         {user &&
            <Navbar />
         }
         {user ?
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/SignupDetails" element={<SignupDetails />} />
            <Route path="/profile" element={<ParentOprate />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes> 
         : 
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/SignupDetails" element={<SignupDetails />} />
            <Route path="/profile" element={<ParentOprate />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes> 
         }

      </>
   )
}

export default MainPage