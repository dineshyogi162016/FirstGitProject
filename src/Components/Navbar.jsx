import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Home from './Home';

const Navbar = () => {
   const navigate = useNavigate();

   const handlelogout = ()=>{
      sessionStorage.removeItem("LoginData");
      navigate("/")
   }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow" style={{position:"sticky", top:"0", zIndex:"10"}}>
            <Link className="navbar-brand" to={"/home"}><strong>Welcome</strong></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                     <Link className="nav-link" to={"/home"}>Home</Link>
                  </li>
                  <li className="nav-item active">
                     <Link className="nav-link" to={"/SignupDetails"}>Resister Users</Link>
                  </li>
                  <li className="nav-item active">
                     <Link className="nav-link" to={"/profile"}>My Profile</Link>
                  </li>
               </ul>
               <div className="form-inline my-2 my-lg-0">
                  <button className="btn btn-outline-danger" onClick={handlelogout}>LogOut</button>
               </div>

            </div>
      </nav>
    </>
  )
}

export default Navbar
