import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Swal = require("sweetalert2")

const LogOut = () => {
   const [checkloginn, setcheckloginn] = useState(0);

   const navigate = useNavigate();

   const handlelogout = async () => {
      let currentUser = JSON.parse(localStorage.getItem("LoginData"))

      if(currentUser){
         console.log("currentUser", currentUser )
         let currentUserToken = currentUser.token
         currentUser = currentUser.user

         try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}logout?email=${currentUser}&token=${currentUserToken}`,{
               method: "DELETE",
               headers: {
                  'Content-Type' : 'application/json',
                  'Authorization' : JSON.parse(localStorage.getItem("LoginData")).token
               }
            })
            const result = await response.json();

            console.log("result", result)

            if(result){

               const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                  }
               });
               Toast.fire({
                  icon: "error",
                  title: "Successfully LogOut"
               });

               navigate("/")
               localStorage.removeItem("LoginData");
            }
            
         } catch (error) {
            console.log("LogOut Error : ", error)
         }

      }

   }


   useEffect(() => {
      handlelogout()

      const logdata = JSON.parse(localStorage.getItem("LoginData")) || {}
      const checklogin = Object.entries(logdata).length;
      setcheckloginn(checklogin);
   },[])
  return (
   <>
      {/* {checkloginn > 0 && 
         <div className="w-50 mx-auto shadow border p-4 my-5">
            <button className='btn btn-outline-danger my-5 mx-5' onClick={() => handlelogout()} > LogOut </button>
            <button className='btn btn-outline-danger my-5 mx-5' onClick={() => handlelogout()} > LogOut All Accounts </button>
         </div>
      } */}
      {checkloginn <= 0 &&
         <div className='border shadow p-5 w-50 mx-auto my-5'>
            <h1><Link to={"/"}>LogIn</Link> Required for access</h1>
         </div>
      }
      
   </>
  )
}

export default LogOut
