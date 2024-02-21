import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import SuccessAlert from '../Sweet Alerts/SuccessAlert';
import WarnAlert from '../Sweet Alerts/WarnAlert';
import ErrorAlert from '../Sweet Alerts/ErrorAlert';


const MyProfile = ({ setparenttab }) => {
   const [myProfile, setmyProfile] = useState({})
   const [checkloginn, setcheckloginn] = useState(0);
   const [Varify, setVarify] = useState(false)

   const navigate = useNavigate()

   const getprofiledata = async () => {
      try {
         const response = await fetch(`${process.env.REACT_APP_API_URL}profile`, {
            method : "GET", 
            headers: {
               'Content-Type' : "application/json",
               'user' : JSON.parse(localStorage.getItem("LoginData")).user,
               'Authorization' : JSON.parse(localStorage.getItem("LoginData")).token
            }
         });

         const result = await response.json();
         
         if(result.error){
            // ErrorAlert(result.error)
            console.log("No profile found")
            setmyProfile(result)
         }else {
            setmyProfile(result)
            setVarify(result.isVarified)
         }

      } catch (error) {
         console.log("Get Profile Data Error", error);
      }
   }

   // const handledelete = async (e) => {
   //    try {
   //       const response = await fetch(`${process.env.REACT_APP_API_URL}profile/${e._id}`, {
   //          method: "DELETE",
   //          headers: {
   //             'Content-Type' : "application/json",
   //             'Authorization' : JSON.parse(localStorage.getItem("LoginData")).token
   //          }
   //       });

   //       const result = await response.json();

   //       if(result.success){
   //          SuccessAlert(result.success)
   //       }else if(result.warning){
   //          WarnAlert(result.warning)
   //       }
         
   //    } catch (error) {
   //       WarnAlert("Something wrong")
   //    }

   // }

   const handleupdate = () => {
      sessionStorage.setItem("ProfileUpdateData", JSON.stringify(myProfile))
      setparenttab(2)
   }

   const handleVarifyUser = async () => {
      if(!Varify){
         try {
            const response = await fetch(`http://localhost:4000/varificationMail?mail=${myProfile.user}&userid=${myProfile._id}&name=${myProfile.firstName}`);

            const result = await response.json()

            if(result.success){
               // Called Alert Component 
               SuccessAlert(result.success)
               
            }else if(result.error){
               // Called Alert Component 
               ErrorAlert(result.error)

            }else if(result.warning){
               // Called Alert Component 
               WarnAlert(result.warning)
            }

         } catch (error) {
            // Called Alert Component 
               WarnAlert("SomeThing wrong")
         }
      }else{
         // Called Alert Component 
         SuccessAlert("Already Varified")
      }
   }
  
   const handleLogout = async () => {
      let currentUser = JSON.parse(localStorage.getItem("LoginData"))

      if(currentUser){
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

            if(result.success){
               // Called Alert Component 
               ErrorAlert(result.success)

               navigate("/")
               localStorage.removeItem("LoginData");
            }
            
         } catch (error) {
            console.log("LogOut Error : ", error)
         }

      }

   }

   const handleLogoutall = async () => {
      let currentUser = JSON.parse(localStorage.getItem("LoginData"))

      if(currentUser){
         currentUser = currentUser.user

         try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}logoutall?email=${currentUser}`,{
               method: "DELETE",
               headers: {
                  'Content-Type' : 'application/json',
                  'Authorization' : JSON.parse(localStorage.getItem("LoginData")).token
               }
            })
            const result = await response.json();
            console.log("result all logout", result)
            if(result.success){

               // Called Alert Component 
               ErrorAlert(result.success)

               navigate("/")
               localStorage.removeItem("LoginData");
            }else if(result.error){

               // Called Alert Component 
               ErrorAlert(result.error)
            }
            
         } catch (error) {
            console.log("LogOut Error : ", error)
         }

      }

   }

   useEffect(() => {
      getprofiledata()

      const logdata = JSON.parse(localStorage.getItem("LoginData")) || {}
      const checklogin = Object.entries(logdata).length;
      setcheckloginn(checklogin);

   }, [])
   return (
      <>
         {checkloginn > 0 && <div className=" text-center my-2 px-4 py-4 ">
            {
               <div className="w-50 mx-auto shadow border p-4">
                  <button onClick={handleVarifyUser} className={`btn mx-5 my-4 ${Varify === true ? "btn-outline-success" : "btn-outline-danger" } `}> {Varify === true ? ( <> Varified <FcApproval /> </> ) : ("Not Varified" )}</button>

                  <button className="btn btn-outline-danger mx-5 my-4" onClick={handleLogout} >LogOut</button>

                  <button className='btn btn-outline-danger my-5 mx-5' onClick={handleLogoutall} > LogOut All Accounts </button>
                  {
                     myProfile.error && <button className='btn btn-outline-success my-5 mx-5' onClick={() => setparenttab(2)} > Create Profile</button>
                  }
                  {
                     myProfile.user && <div className="">
                        <div> 
                           <h1>ProFile Data</h1> 
                        </div> <hr />
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Name: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.firstName + " " + myProfile.lastName}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Email: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.user}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Age: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.age}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Gender: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.gender}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Phone No.: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.phoneNo}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Hobbies: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.hobbies}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>State: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.state}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>City: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.city}</span></h5>
                        <hr />
                        <div className="d-flex justify-content-center mx-5">
                           {/* <button style={{ fontSize: "25px" }} onClick={() => handledelete(myProfile)} className="btn btn-outline-danger  px-5 py-1 rounded-5 d-flex"><MdDeleteForever /></button> */}
                           <button style={{ fontSize: "25px" }} onClick={() => handleupdate(myProfile)} className="btn btn-outline-info  px-5 py-1 rounded-5 d-flex"><FaEdit /></button>
                        </div>
                     </div>
                  }
               </div>
            }
         </div>}
         {checkloginn <= 0 &&
            <div className='border shadow p-5 w-50 mx-auto my-5'>
               <h1><Link to={"/"}>LogIn</Link> Required for access</h1>
            </div>
         }
      </>
   )
}


export default MyProfile
