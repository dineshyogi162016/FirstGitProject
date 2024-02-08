import React, { useEffect, useState } from 'react'
const Swal = require('sweetalert2')
const StatesAndCities = require("../../ProjectData/StatesWithCity.json")


const SecondForm = ({ settabno, setdata, data, error, seterror, action, setaction, setparenttab }) => {

  const [seconderror, setseconderror] = useState({})

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  const handlesubmit = async () => {
    
    if(varify()){
      // await setdata({...data, ["user"] : JSON.parse(localStorage.getItem("LoginData")).user })

      if (action === "Submit") {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}profile`, {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json', 
              'Authorization' : JSON.parse(localStorage.getItem("LoginData")).token
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();

          if(result) {
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
            } else{
              Toast.fire({
                icon: "success",
                title: "Successfully Profile Created "
              });

              setTimeout(() => {
                setparenttab(1)
              }, 1500);

              setdata({ firstName: "", lastName: "", hobbies: "", age: "", state: "", city: "", gender: "" })
            }
          }          

        } catch (error) {
          console.log("Error in Profile SecondForm.jsx:", error)
          
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
          Toast.fire({
            icon: "warning",
            title: "Something went wrong! "
          });

        }
      } else if (action === "Update") {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}profile/${data._id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : JSON.parse(localStorage.getItem("LoginData")).token
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();
          
          console.log("result updaate", result )
          
          if(result) {

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
            } else{
              Toast.fire({
                icon: "success",
                title: "Successfully Profile Updated "
              });

              // settabno(3)
              setdata({ firstName: "", lastName: "", phoneNo: "", age: "", state: "", city: "", gender: "", hobbies: "" })
              setaction("Submit")
              sessionStorage.setItem("ProfileUpdateData", JSON.stringify({}))

              setTimeout(() => {
                setparenttab(1)
              }, 1500);
            }
          }  

        } catch (error) {
          console.log("Error:", error)
        }

      }
    }
  }

  const varify = ()=>{
      let valid = true;
      const localerror2= {};
      
      if(data && data.state.length === 0){
         localerror2.state = "State is required!";
         valid = false;
      }else if(data && data.state.length < 4){
         localerror2.state= "State must be 4 characters.";
         valid= false;
      }

      if(data && data.city.length === 0){
         localerror2.city = "City is required!";
         valid = false;
      }

      if(data && data.gender.length === 0){
         localerror2.gender = "Gender is required!";
         valid = false;
      }

      if(data && data.hobbies.length === 0){
         localerror2.hobbies = "Hobbies is required!";
         valid = false;
      }

      setseconderror(localerror2);
      return valid;
  }

  useEffect(() => {
    setdata({...data, ["user"] : JSON.parse(localStorage.getItem("LoginData")).user })
  }, []);

  return (
    <>
      <div className="w-50 border mx-auto p-4 my-5 rounded-5 shadow text-center">
        <h1 className='text-info'>Step 2</h1><hr />
        <div className="d-flex">
          <div className="w-50">
            <label className='d-flex justify-content-between align-items-center mt-4 mr-3 text-info'><strong>State:</strong>
              {/* <input type="text" placeholder='Your state...' className='form-control w-75 ' name='state' onChange={handlechange} value={data.state} /> */}
              <select name="state" placeholder='Your state...' onChange={handlechange} className='form-control w-75' value={data.state} >
                <option selected disabled > -- Select State -- </option>
                {
                  StatesAndCities.map((e) => {
                    return (
                      <option value={e.state}>{e.state}</option>
                    )
                  })
                }
              </select>
            </label>
            {seconderror.state && <p className='text-danger' >{seconderror.state}</p>}
          </div>            
          <div className="w-50">
            <label className='d-flex justify-content-between align-items-center mt-4 ml-3 text-info'><strong>City:</strong>
              {/* <input type="text" placeholder='Your city...' className='form-control w-75 ' name='city' onChange={handlechange} value={data.city} /> */}
              
              <select name="city" placeholder='Your city...' onChange={handlechange} className='form-control w-75' value={data.city} >
                <option  disabled >-- Select City --</option>
                { data.state && 
                  StatesAndCities.find((e) => e.state === data.state)?.City.map((city) => (
                    <option value={city}>{city}</option>
                  ))
                }
              </select>
            </label>
            {seconderror.city && <p className='text-danger' >{seconderror.city}</p>}
          </div>
        </div>
        <div className="d-flex mb-4">
          <div className="w-50">
            <label className='d-flex justify-content-start align-items-center mt-4 mr-3 text-info'><strong>Gender:</strong>
              <input type="radio" className='ml-5 mr-0 form-control' name='gender' value={"male"} onChange={handlechange} checked={data.gender === "male"} style={{ fontSize: "10px" }} /> Male
              <input type="radio" className='ml-5 mr-0  form-control' name='gender' value={"female"} onChange={handlechange} checked={data.gender === "female"} style={{ fontSize: "10px" }} /> Female
            </label>
            {seconderror.gender && <p className='text-danger' >{seconderror.gender}</p>}
          </div>
          <div className="w-50">
            <label className='d-flex justify-content-between align-items-center ml-3 mt-4 text-info'><strong>Hobbies:</strong>
              <input type="text" placeholder='Hobbies...' className='form-control w-75 ' name='hobbies' onChange={handlechange} value={data.hobbies} />
            </label>
            {seconderror.hobbies && <p className='text-danger' >{seconderror.hobbies}</p>}
          </div>
        </div>

        <hr />
         <div className="d-flex justify-content-between mt-4">
            <button className='btn btn-outline-info px-4 ' onClick={()=>settabno(1)}>Prev</button>
            <button className='btn btn-outline-info px-4 ' onClick={handlesubmit}>{action}</button>
         </div>
        </div>
    </>
  )
}

export default SecondForm
