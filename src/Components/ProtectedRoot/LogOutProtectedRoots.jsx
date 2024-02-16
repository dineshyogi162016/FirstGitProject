import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const LogOutProtectedRoots = (props) => {
   const navigate = useNavigate()
   const {Component} = props

   useEffect(()=>{
      const logdata = JSON.parse(localStorage.getItem("LoginData"))|| {}

      const checklogin = Object.entries(logdata).length;
      if(!checklogin){
         navigate("/")
      }

   })

  return (
   <div>
      <Navbar />
      <Component />
   </div>
  )
}


export default LogOutProtectedRoots
