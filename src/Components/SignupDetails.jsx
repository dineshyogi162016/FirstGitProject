import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import WarnAlert from '../Sweet Alerts/WarnAlert';
import ErrorAlert from '../Sweet Alerts/ErrorAlert';


const SignupDetails = () => {
   const [checkloginn, setcheckloginn] = useState(0);
   const [signupdata, setsignupdata] = useState([])
   const [APIMassage, setAPIMassage] = useState("")
   
   const navigate = useNavigate()
   
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
         console.log("No data find something error : ", error )
         WarnAlert("Data finding Error")
      }
   }


   const handledelete = async(e)=>{
      try {
         let response = await fetch(`${process.env.REACT_APP_API_URL}SignupDetails/${e.email}`,{
            method: "DELETE",
            headers : {
               "Content-Type" : "application/json",
               'Authorization' : JSON.parse(localStorage.getItem("LoginData")).token
            }
         })

         const result = await response.json()
         
         if(result.success){
            ErrorAlert(result.success)

            getRegisterUsers()

            let currentUser = JSON.parse(localStorage.getItem("LoginData")).user

            if(e.email === currentUser){
               localStorage.removeItem("LoginData")
               navigate("/")
            }

         }else if(result.warning){
            WarnAlert(result.warning)
         }

      } catch (error) {
         WarnAlert("Something wrong")
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
         {signupdata.length <= 0 ? 
            <div class="d-flex justify-content-center m-5">
               <div class="spinner-border m-5" role="status">
                  <span class="sr-only">Loading...</span>
               </div>
            </div>
         :
            <table className="table table-hover">
               <thead className='bg-secondary'>
                  <tr>
                     <th scope="col">Sr. No</th>
                     <th scope="col">Name</th>
                     <th scope="col">Email</th>
                     {/* <th scope="col">Password</th> */}
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
                              {/* <td>{e.password}</td> */}
                              <td className='d-flex justify-content-center'><button style={{fontSize:"25px"}} onClick={()=>handledelete(e)} className="btn btn-outline-danger px-1 py-1 rounded-5 d-flex"><MdDeleteForever /></button></td>
                              
                           </tr>
                           </>
                        )
                     })
                  }               
               </tbody>
            </table>
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
