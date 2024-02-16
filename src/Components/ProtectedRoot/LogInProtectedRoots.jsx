import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const LogInProtectedRoots = (props) => {
   const navigate = useNavigate()
   const {Component} = props

   useEffect(()=>{
      const logdata = JSON.parse(localStorage.getItem("LoginData"))|| {}

      const checklogin = Object.entries(logdata).length;
      if(checklogin){
         navigate("/home")
      }

   })

  return (
   <div>
      <Component />
   </div>
  )
}

export default LogInProtectedRoots
