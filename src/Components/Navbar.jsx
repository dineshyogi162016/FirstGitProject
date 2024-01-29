import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Swal = require('sweetalert2')

const Navbar = () => {
   const navigate = useNavigate();
   
   const handlelogout = async()=>{
      // sessionStorage.removeItem("LoginData");
      
      const logdata = JSON.parse(sessionStorage.getItem("LoginData"))|| {}

      const response = await fetch(`${process.env.REACT_APP_API_URL}home/${logdata._id}`,{
         method: "DELETE"
      })

      const result = await response.json()
      console.log("logOut: ", logdata._id )
      console.log("responsem : ", result )

      // Sweet Alert use 
      // const Toast = Swal.mixin({
      //    toast: true,
      //    position: "top-end",
      //    showConfirmButton: false,
      //    timer: 1500,
      //    timerProgressBar: true,
      //    didOpen: (toast) => {
      //      toast.onmouseenter = Swal.stopTimer;
      //      toast.onmouseleave = Swal.resumeTimer;
      //    }
      //  });
      //  Toast.fire({
      //    icon: "error",
      //    title: "Successfully LogOut"
      //  });

       setTimeout(() => {
         navigate("/")
      }, 1500);
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
