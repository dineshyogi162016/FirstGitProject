import React, {useEffect, useState } from 'react'
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
const Swal = require('sweetalert2')

const ForgetPassword = () => {
   const [data, setdata] = useState({
      userDetails : {
         email: "",
         password: ""
      }
   })
   const [error, seterror] = useState({})
   const [passwordshow, setpasswordshow] = useState("password")
   const emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   const passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
   const navigate = useNavigate();

   
   
   const handlechange = (e)=>{
      // setdata({...data, [e.target.name]: e.target.value});
      setdata({...data, userDetails : {...data.userDetails, [e.target.name]: e.target.value} })
   }


   const handlepasswordshowornot = ()=>{
      if(passwordshow=== "password"){
         setpasswordshow("text");
      }else{
         setpasswordshow("password")
      }
   }

   const handlesubmit = async ()=>{
      if(varify()){
         try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
               method: "POST",
               headers: {
                  'Content-Type' : "application/json",
               },
               body: JSON.stringify(data)
            }) 

            const result = await response.json();

            // Sweet Alert use 
            const Toast = Swal.mixin({
               toast: true,
               position: "top-end",
               showConfirmButton: false,
               timer: 2000,
               timerProgressBar: true,
               didOpen: (toast) => {
                 toast.onmouseenter = Swal.stopTimer;
                 toast.onmouseleave = Swal.resumeTimer;
               }
            });

             if(result.loginMeta){
               localStorage.setItem("LoginData", JSON.stringify(result.loginMeta))
               Toast.fire({
                  icon: "success",
                  title: result.massage
               });

               setTimeout(() => {
                  navigate("/home")
               }, 1500);
               
            }else if(result.massage){
               Toast.fire({
                  icon: "warning",
                  title: result.massage
               });
            }else{
               Toast.fire({
                  icon: "warning",
                  title: result.massage
               });
            }

         } catch (error) {
            // Sweet Alert use 
            const Toast = Swal.mixin({
               toast: true,
               position: "top-end",
               showConfirmButton: false,
               timer: 2000,
               timerProgressBar: true,
               didOpen: (toast) => {
                 toast.onmouseenter = Swal.stopTimer;
                 toast.onmouseleave = Swal.resumeTimer;
               }
             });
             Toast.fire({
               icon: "warning",
               title: "Something went wrong!"
             });

         }

      }
   }

   const varify = () => {
      let valid = true;
      const localerror= {};
      
      if(data && data.userDetails.email.length === 0){
         localerror.email = "email is required!";
         valid = false;
      }else if(!emailregex.test(data.userDetails.email)){
         localerror.email= "not a valid email"
      }

      if(data && data.userDetails.password.length === 0){
         localerror.password = "password is required!";
         valid = false;
      }else if(data && data.userDetails.password.length < 6){
         localerror.password= "password must be 6 characters.";
         valid= false;
      }else if(!passwordregex.test(data.userDetails.password)){
         localerror.password = "use valid password";
         valid= false;
      }

      seterror(localerror);
      return valid;
   }

   let user = JSON.parse(localStorage.getItem("LoginData"))


  return (
    <>
      {user && 
         <div className='border shadow p-5 w-50 mx-auto my-5 text-center'>
            <h1>Go to <Link to={"/profile"}>Profile</Link> Page</h1> 
            <p>If you want access LOGIN page, So LOGOUT first. Because You are already login. </p>
         </div>
      }

      { !user && <div className="w-50 border mx-auto p-4 my-5 rounded-5 shadow text-center">
         <h1 className='text-success'>LogIn Form</h1><hr />
         <label className='d-flex justify-content-between align-items-center mt-4 '><strong>Email:</strong>
            <input type="text" placeholder='Enter your email...' className='form-control w-75' name='email' value={data.email} onChange={handlechange} />
         </label>
         {error.email && <p className='text-danger' >{error.email}</p>}
         <label className='d-flex justify-content-between align-items-center mt-4 ' style={{position:"relative"}}><strong>Password:</strong>
            <input type={passwordshow} placeholder='Enter your password...' className='form-control w-75' name='password' value={data.password} onChange={handlechange} />
            <span style={{position:"absolute", right:"10px", top:"5px", cursor:"pointer"}} onClick={handlepasswordshowornot} >{(passwordshow==="password"? <FaRegEyeSlash/> : <FaRegEye/> )}</span>
         </label>
         {error.password && <p className='text-danger'>{error.password}</p>}
         <button className='btn btn-outline-success w-25 mt-4' onClick={handlesubmit}>Submit</button>
         <p className='mt-3'><Link to={"/signup"}>SignUp </Link> if you don't have account.</p>
      </div> }

    </>
  )
}

export default ForgetPassword
