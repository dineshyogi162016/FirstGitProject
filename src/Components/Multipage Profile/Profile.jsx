import React, { useEffect, useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Profile = ({setaction, data, setdata, settabno}) => {
  const [Profiledata, setProfiledata] = useState([]);

  const getprofiledata = async()=>{
    try {
       const response = await fetch(`${process.env.REACT_APP_API_URL}profile`);
       const result = await response.json();

       setProfiledata(result);
      //  console.log("get data",result)

    } catch (error) {
       console.log("Get Profile Data Error");
    }
  }

  const handledelete = async(e)=>{
    try {
      const response =  await fetch(`${process.env.REACT_APP_API_URL}profile/${e._id}`,{
        method: "DELETE",
      });
      
      getprofiledata()
    } catch (error) {
      console.log("Error:", error)
    }

  } 

  const handleupdate = (e)=>{
    setdata(e)
    setaction("Update")
    settabno(1)
  }

  useEffect(()=>{
    getprofiledata()
  },[])
  return (
    <>
      {
        <div className="w-75 my-5 mx-auto shadow border ">
            <table className="table table-hover">
              <thead className='bg-secondary'>
                <tr>
                    <th scope="col">Sr. No</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">State</th>
                    <th scope="col">City</th>
                    <th scope="col">Hobbies</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody >
                {
                  Profiledata.map((e,i)=>{
                    return(
                        <tr key={i}>
                          <th scope="row">{i+1}</th>
                          <td>{e.firstName}</td>
                          <td>{e.lastName}</td>
                          <td>{e.age}</td>
                          <td>{e.gender}</td>
                          <td>{e.phoneNo}</td>
                          <td>{e.state}</td>
                          <td>{e.city}</td>
                          <td>{e.hobbies}</td>
                          <td className='d-flex justify-content-center'>
                            <button style={{fontSize:"25px"}} onClick={()=>handledelete(e)} className="btn btn-outline-danger px-1 py-1 rounded-5 d-flex"><MdDeleteForever /></button>
                          </td>
                          <td>
                          <button style={{fontSize:"25px"}} onClick={()=>handleupdate(e)} className="btn btn-outline-info px-1 py-1 rounded-5 d-flex"><FaEdit /></button>
                          </td>
                        </tr>
                    )
                  })
                }
              </tbody>
            </table>
        </div>
      }
    </>
  )
}

export default Profile
