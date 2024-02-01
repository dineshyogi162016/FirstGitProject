import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
const Swal = require('sweetalert2')

const Navbar = () => {
   const navigate = useNavigate();
   let user = JSON.parse(localStorage.getItem("LoginData"))
   if(user){
      user = user.user
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
                  <Link className="nav-link text-dark p-0 text-center" to={"/profile"}> <h2 className='m-0'><CgProfile /></h2>{user}</Link>
                  {/* <button className="btn btn-outline-danger" onClick={handlelogout}>LogOut</button> */}
               </div>

            </div>
      </nav>}
    </>
  )
}

export default Navbar
