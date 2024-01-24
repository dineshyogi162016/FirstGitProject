import React, {useEffect, useState } from 'react'
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
const Swal = require('sweetalert2')

const Signup = () => {
   // const [data, setdata] = useState({
   //    name: "",
   //    email: "",
   //    password: ""
   // });

   const [data, setdata] = useState({
      userDetails: {
         name: "",
         email: "",
         password: ""
      }
   });
   const [error, seterror] = useState({})
   const [signupdata, setsignupdata] = useState([])
   const [passwordshow, setpasswordshow] = useState("password")
   const emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   const passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
   const navigate = useNavigate();

   const handlechange = (e)=>{
      // setdata({...data, [e.target.name]: e.target.value});
      setdata({...data, userDetails: {...data.userDetails, [e.target.name]: e.target.value} })
   }
   const handlepasswordshowornot = ()=>{
      if(passwordshow=== "password"){
         setpasswordshow("text");
      }else{
         setpasswordshow("password")
      }
   }

   const handlesubmit = async()=>{
      if(varify()){

         // Signup Code using localStorage 
         // let presignupdata = ([...signupdata]);
         // let signupdataall = presignupdata.concat(data);
         // setsignupdata(signupdataall)

         // localStorage.setItem("SignupData", JSON.stringify(signupdataall))
         // setdata({name:"",email:"", password:""})
         //    navigate("/")
         //    alert("SignUp Successfully")

         const checksignup = signupdata.find(e => e.userDetails.email === data.userDetails.email) || {};
         const checksignup1 = Object.entries(checksignup).length;

         console.log("Check data signup data", checksignup1)

      if(checksignup1 <= 0){
         try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}signup`, {
               method: "POST",
               headers: {
                  'Content-Type' : 'application/json',
               },
               body: JSON.stringify(data),
            })

            const result = await response.json();

            setdata({name:"",email:"", password:""})

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
               icon: "success",
               title: "Successfully Signup "
             });

             setTimeout(() => {
               navigate("/")
            }, 2000);

         } catch (error) {
            console.log("Error in Signup.jsx: ", error)
         }
      }else if (checksignup1 > 0){
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
            title: "User is already exists"
          });
      }


      }
   }

   const varify = ()=>{
      let valid = true;
      const localerror= {};
      
      if(data && data.userDetails.name.length === 0){
         localerror.name = "Name is required!";
         valid = false;
      }else if(data && data.userDetails.name.length < 4){
         localerror.name= "Name must be 4 characters.";
         valid= false;
      }

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

   const getRegisterUsers = async() => {
      try {
         let response = await fetch(`${process.env.REACT_APP_API_URL}SignupDetails`);
         let result = await response.json();

         setsignupdata(result)
         // console.log("all Signup users: ",result)

      } catch (error) {
         console.log("All register users Error: ", error )
      }
   }


   useEffect(()=> {
      let getdata = JSON.parse(localStorage.getItem("SignupData"))|| [];
      setsignupdata(getdata);      

      getRegisterUsers()
      // console.log("Get All a Data: ", getdata)
   },[]);

  return (
    <>
      <div className="w-50 border mx-auto p-4 my-5 rounded-5 shadow text-center">
         <h1 className='text-success'>SignUp Form</h1><hr />
         <label className='d-flex justify-content-between align-items-center mt-4 '><strong>Name:</strong>
            <input type="text" placeholder='Enter your name...' className='form-control w-75' name='name' onChange={handlechange} />
         </label>
         {error.name && <p className='text-danger' >{error.name}</p>}
         <label className='d-flex justify-content-between align-items-center mt-4 '><strong>Email:</strong>
            <input type="text" placeholder='Enter your email...' className='form-control w-75' name='email' onChange={handlechange} />
         </label>
         {error.email && <p className='text-danger' >{error.email}</p>}
         <label className='d-flex justify-content-between align-items-center mt-4 ' style={{position:"relative"}}><strong>Password:</strong>
            <input type={passwordshow} placeholder='Enter your password...' className='form-control w-75' name='password' onChange={handlechange} />
            <span style={{position:"absolute", right:"10px", top:"5px", cursor:"pointer"}} onClick={handlepasswordshowornot} >{(passwordshow==="password"? <FaRegEyeSlash/> : <FaRegEye/> )}</span>
         </label>
         {error.password && <p className='text-danger'>{error.password}</p>}
         <button className='btn btn-outline-success w-25 mt-4' onClick={handlesubmit}>Submit</button>
         <p className='mt-3'><Link to={"/"}>LogIn </Link> if you have account.</p>
      </div>
    </>
  )
}

export default Signup
