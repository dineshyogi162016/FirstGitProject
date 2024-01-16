import React, { useEffect, useState } from 'react'
import FirstForm from './FirstForm'
import SecondForm from './SecondForm';

const Parent = ({ setparenttab }) => {
  const [tabno, settabno] = useState(1);
  const [action, setaction] = useState("Submit")
  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    phoneNo: 0,
    age: 0,
    state: "",
    city: "",
    gender: "",
    hobbies: ""
  });
  const [error, seterror] = useState({})

  useEffect(() => {
    const profileData = JSON.parse(sessionStorage.getItem("ProfileUpdateData")) || {}
    if(Object.entries(profileData).length > 0){
      setdata(profileData)
      setaction("Update")
    }
  }, [])
  return (
    <>
      <div className="text-center my-4">
        {/* <button className="btn btn-outline-dark mx-3" onClick={() => settabno(1)}><strong> Step 1</strong></button>
        <button className="btn btn-outline-dark mx-3" onClick={() => settabno(2)}><strong> Step 2</strong></button> 
        <button className="btn btn-outline-dark mx-3" onClick={() => settabno(3)}><strong> My Profile</strong></button> */}

        {tabno === 1 && <FirstForm settabno={settabno} setdata={setdata} data={data} error={error} seterror={seterror} setparenttab={setparenttab} />}
        {tabno === 2 && <SecondForm settabno={settabno} setdata={setdata} data={data} error={error} seterror={seterror} action={action} setaction={setaction} setparenttab={setparenttab} />}
        {/* {tabno === 3 && <Profile settabno={settabno} setdata={setdata} data={data} setaction={setaction} />} */}
      </div>
    </>
  )
}

export default Parent
