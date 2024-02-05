import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
const Swal = require('sweetalert2')

const Navbar = () => {
   const [MyName, setMyName] = useState("No Name")
   const navigate = useNavigate();
   let user = JSON.parse(localStorage.getItem("LoginData"))
   
   const getRegisterUsers = async() => {
      user = user.user
      try {
         let response = await fetch(`${process.env.REACT_APP_API_URL}SignupDetails`,{
            method : "GET",
            headers : {
               "Content-Type" : "application/json",
               'Authorization' : JSON.parse(localStorage.getItem("LoginData")).token
            }
            
         });
         let result = await response.json();

         let userDetails = result.find((e) => {
           return e.email === user;
         })

         user = userDetails.name ;

         setMyName(user)

      } catch (error) {
         console.log("All register users Error: ", error )
      }
   }

   if(user){ 
      getRegisterUsers()
   }
  return (
    <>
      {user && <nav className="navbar navbar-expand-lg navbar-light bg-light shadow" style={{position:"sticky", top:"0", zIndex:"10", padding: "3px 20px"}}>
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
               </ul>
               <div className="form-inline my-2 my-lg-0">
                  <Link className="nav-link text-dark p-0 text-center" to={"/profile"}> <h2 className='m-0'><CgProfile /></h2>{MyName}</Link>
                  {/* <button className="btn btn-outline-danger" onClick={handlelogout}>LogOut</button> */}
               </div>

            </div>
      </nav>}
    </>
  )
}

export default Navbar
