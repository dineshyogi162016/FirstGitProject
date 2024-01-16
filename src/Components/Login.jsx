import React, {useEffect, useState } from 'react'
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
   const [data, setdata] = useState({
      email: "",
      password: ""
   });
   const [error, seterror] = useState({})
   const [signupdata, setsignupdata] = useState([])
   const [passwordshow, setpasswordshow] = useState("password")
   const emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   const passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
   const navigate = useNavigate();

   const handlechange = (e)=>{
      setdata({...data, [e.target.name]: e.target.value});
   }
   const handlepasswordshowornot = ()=>{
      if(passwordshow=== "password"){
         setpasswordshow("text");
      }else{
         setpasswordshow("password")
      }
   }

   const handlesubmit = ()=>{
      if(varify()){
      const checksignup = signupdata.find(e => e.email === data.email && e.password === data.password ) || {};
      const checksignup1 = Object.entries(checksignup).length;

         if(checksignup1>0){
            sessionStorage.setItem("LoginData", JSON.stringify(data))
            setdata({email:"", password:""})
            navigate("/home")
            alert("Login Successfully")
         }else{
            alert("Fill valid details")
         }
      }
   }

   const varify = ()=>{
      let valid = true;
      const localerror= {};
      
      if(data && data.email.length === 0){
         localerror.email = "email is required!";
         valid = false;
      }else if(!emailregex.test(data.email)){
         localerror.email= "not a valid email"
      }

      if(data && data.password.length === 0){
         localerror.password = "password is required!";
         valid = false;
      }else if(data && data.password.length < 6){
         localerror.password= "password must be 6 characters.";
         valid= false;
      }else if(!passwordregex.test(data.password)){
         localerror.password = "use valid password";
         valid= false;
      }

      seterror(localerror);
      return valid;
   }

   useEffect(()=> {
      let getdata = JSON.parse(localStorage.getItem("SignupData"))|| [];
      setsignupdata(getdata);      

      // const checksignup = getdata.find(e => e.email   === data.email) || {};
      // const checksignup1 = Object.entries(checksignup).length;
      // setsignupornot(checksignup1)

      // console.log("Get All a Data: ", checksignup1)
   },[]);


  return (
    <>
      <div className="w-50 border mx-auto p-4 my-5 rounded-5 shadow text-center">
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
      </div>
    </>
  )
}

export default Login
