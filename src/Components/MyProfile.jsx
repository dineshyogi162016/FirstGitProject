import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const MyProfile = ({ setparenttab }) => {
   const [myProfile, setmyProfile] = useState({})
   const [checkloginn, setcheckloginn] = useState(0);

   const getprofiledata = async () => {
      try {
         console.log(process.env.REACT_APP_API_URL)
         const response = await fetch(`${process.env.REACT_APP_API_URL}profile`);
         const result = await response.json();

         const logdata = JSON.parse(sessionStorage.getItem("LoginData")) || {}

         let myprofiledata = result.find(e => e.user === logdata.email);
         setmyProfile(myprofiledata)

      } catch (error) {
         console.log("Get Profile Data Error", error);
      }
   }

   const handledelete = async (e) => {
      try {
         const response = await fetch(`${process.env.REACT_APP_API_URL}profile/${e._id}`, {
            method: "DELETE",
         });

         getprofiledata()
         sessionStorage.setItem("ProfileUpdateData", JSON.stringify({}))
         // console.log("Deleted Item is : ", response)
         
      } catch (error) {
         console.log("Error:", error)
      }

   }

   const handleupdate = () => {
      sessionStorage.setItem("ProfileUpdateData", JSON.stringify(myProfile))
      setparenttab(2)
   }

   useEffect(() => {
      getprofiledata()

      const logdata = JSON.parse(sessionStorage.getItem("LoginData")) || {}
      const checklogin = Object.entries(logdata).length;
      setcheckloginn(checklogin);

   }, [])
   return (
      <>
         {checkloginn > 0 && <div className=" text-center my-2 px-4 py-4 ">
            {
               <div className="w-50 mx-auto shadow border p-4">
                  {
                     myProfile && <div className="">
                        <h1>ProFile Data</h1><hr />
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Name: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.firstName + " " + myProfile.lastName}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Email: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.user}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Age: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.age}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Gender: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.gender}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Phone No.: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.phoneNo}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>Hobbies: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.hobbies}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>State: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.state}</span></h5>
                        <h5 className='d-flex justify-content-between mx-5 my-3'>City: <span className='text-primary ' style={{ fontWeight: "350" }} >{myProfile.city}</span></h5>
                        <hr />
                        <div className="d-flex justify-content-between mx-5">
                           <button style={{ fontSize: "25px" }} onClick={() => handledelete(myProfile)} className="btn btn-outline-danger  px-5 py-1 rounded-5 d-flex"><MdDeleteForever /></button>
                           <button style={{ fontSize: "25px" }} onClick={() => handleupdate(myProfile)} className="btn btn-outline-info  px-5 py-1 rounded-5 d-flex"><FaEdit /></button>
                        </div>
                     </div>
                  }
                  {
                     !myProfile && <button className='btn btn-outline-success my-5' onClick={() => setparenttab(2)} >Create Profile</button>
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
