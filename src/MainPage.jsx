import React, { useEffect, useState } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import ParentOprate from "./Components/Multipage Profile/ParentOprate";
import SignupDetails from "./Components/SignupDetails";

const MainPage = () => {
   const [checkloginn, setcheckloginn] = useState(0);

   useEffect(() => {
      const logdata = JSON.parse(sessionStorage.getItem("LoginData")) || {}

      const checklogin = Object.entries(logdata).length;
      setcheckloginn(checklogin);

   }, [])
   return (
      <>
         {checkloginn > 0 &&
            <Navbar />
         }
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/SignupDetails" element={<SignupDetails />} />
            <Route path="/profile" element={<ParentOprate />} />
         </Routes>
      </>
   )
}

export default MainPage