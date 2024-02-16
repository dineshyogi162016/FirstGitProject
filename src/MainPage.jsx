import React from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import ParentOprate from "./Components/Multipage Profile/ParentOprate";
import SignupDetails from "./Components/SignupDetails";
import LogOut from "./Components/LogOut";
import PageNotFound from "./Components/PageNotFound";
import LogOutAll from "./Components/LogOutAll";
import LogOutProtectedRoots from "./Components/ProtectedRoot/LogOutProtectedRoots";
import LogInProtectedRoots from "./Components/ProtectedRoot/LogInProtectedRoots";

const MainPage = () => {
   // let user = JSON.parse(localStorage.getItem("LoginData"))
   // console.log("userrrrr", user )
   return (
      <> 
         <Routes>
            {/* Not access these pages when user Login  */}
            <Route path="/" element={<LogInProtectedRoots Component={Login} />} />
            <Route path="/signup" element={<LogInProtectedRoots Component={Signup} />} />

            {/* Not access these pages when user LogOut  */}
            <Route path="/home" element={<LogOutProtectedRoots Component={Home} />} />
            <Route path="/SignupDetails" element={<LogOutProtectedRoots Component={SignupDetails} />} />
            <Route path="/profile" element={<LogOutProtectedRoots Component={ParentOprate} />} />
            <Route path="/logout" element={<LogOutProtectedRoots Component={LogOut} />} />
            <Route path="/logoutall" element={<LogOutProtectedRoots Component={LogOutAll} />} />
            <Route path="*" element={<LogOutProtectedRoots Component={PageNotFound} />} />
         </Routes> 
      </>
   )
}

export default MainPage