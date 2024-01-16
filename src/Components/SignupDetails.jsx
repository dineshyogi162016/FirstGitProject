import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";

const SignupDetails = () => {
   const [checkloginn, setcheckloginn] = useState(0);
   const [signupdata, setsignupdata] = useState([])


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


   const handledelete = async(e)=>{
      // let predelete = [...signupdata];
      // predelete.splice(i,1);
      // setsignupdata(predelete);
      // localStorage.setItem("SignupData", JSON.stringify(predelete));
      // console.log(predelete)

      // console.log("data", e)

      try {
         let response = await fetch(`${process.env.REACT_APP_API_URL}SignupDetails/${e._id}`,{
            method: "DELETE"
         });
         
         getRegisterUsers()
         // console.log("delete: ", response)

      } catch (error) {
         console.log("Signup Details delete error:", error)
      }

   }

   
   useEffect(()=>{
      getRegisterUsers()

      const logdata = JSON.parse(sessionStorage.getItem("LoginData"))|| {}

      const checklogin = Object.entries(logdata).length;
      setcheckloginn(checklogin);

      // let getdata = JSON.parse(localStorage.getItem("SignupData"))|| [];
      // setsignupdata(getdata); 


   },[])
  return (
    <>
      {checkloginn > 0 &&
      <div className="w-75 mx-auto my-5 shadow border px-4 pt-4 pb-1 text-center">
         <h1>Resister Users</h1><hr />
         <table className="table table-hover">
            <thead className='bg-secondary'>
               <tr>
                  <th scope="col">Sr. No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Delete</th>
               </tr>
            </thead>
            <tbody>
               {
                  signupdata.map((e,i)=>{
                     return(
                        <>
                        <tr>
                           <th scope="row">{i+1}</th>
                           <td>{e.name}</td>
                           <td>{e.email}</td>
                           <td>{e.password}</td>
                           <td className='d-flex justify-content-center'><button style={{fontSize:"25px"}} onClick={()=>handledelete(e)} className="btn btn-outline-danger px-1 py-1 rounded-5 d-flex"><MdDeleteForever /></button></td>
                           
                        </tr>
                        </>
                     )
                  })
               }               
            </tbody>
         </table>
      </div>
      }
      {checkloginn <= 0 && 
         <div className='border shadow p-5 w-50 mx-auto my-5'>
            <h1><Link to={"/"}>LogIn</Link> Required for access</h1> 
         </div>
      }
    </>
  )
}

export default SignupDetails
