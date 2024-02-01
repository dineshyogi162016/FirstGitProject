import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
const Swal = require('sweetalert2')

const SignupDetails = () => {
   const [checkloginn, setcheckloginn] = useState(0);
   const [signupdata, setsignupdata] = useState([])
   const [APIMassage, setAPIMassage] = useState("")

   const getRegisterUsers = async() => {
      try {
         let response = await fetch(`${process.env.REACT_APP_API_URL}SignupDetails`,{
            method : "GET",
            headers : {
               "Content-Type" : "application/json",
               'Authorization' : JSON.parse(localStorage.getItem("LoginData")).token
            }
            
         });
         let result = await response.json();
         
         if(Array.isArray( result )){
            setsignupdata(result)
         }else{
            setAPIMassage( result )
         }

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
            method: "DELETE",
            headers : {
               "Content-Type" : "application/json",
               'Authorization' : JSON.parse(localStorage.getItem("LoginData")).token
            }
         })

         const result = await response.json()

         if(result){

            // Sweet Alert use 
            const Toast = Swal.mixin({
               toast: true,
               position: "top-end",
               showConfirmButton: false,
               timer: 1500,
               timerProgressBar: true,
               didOpen: (toast) => {
                 toast.onmouseenter = Swal.stopTimer;
                 toast.onmouseleave = Swal.resumeTimer;
               }
             });

            if(result.result){
               Toast.fire({
                  icon: "warning",
                  title: result.result
                });
   
            }else {
               Toast.fire({
                  icon: "error",
                  title: "Successfully Deleted "
                });
               
                getRegisterUsers();
            }
             

         }

      } catch (error) {
         console.log("Signup Details delete error:", error)

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
            title: "Something went wrong, please try again"
          });
      }

   }

   
   useEffect(()=>{
      getRegisterUsers()

      const logdata = JSON.parse(localStorage.getItem("LoginData"))|| {}

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
         {signupdata.length > 0 && <table className="table table-hover">
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
                           <td>{e.userDetails.name}</td>
                           <td>{e.userDetails.email}</td>
                           <td>{e.userDetails.password}</td>
                           <td className='d-flex justify-content-center'><button style={{fontSize:"25px"}} onClick={()=>handledelete(e)} className="btn btn-outline-danger px-1 py-1 rounded-5 d-flex"><MdDeleteForever /></button></td>
                           
                        </tr>
                        </>
                     )
                  })
               }               
            </tbody>
         </table>}
         {signupdata.length <= 0 && 
            <p className='text-danger'>{APIMassage.result }</p>
         }
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
