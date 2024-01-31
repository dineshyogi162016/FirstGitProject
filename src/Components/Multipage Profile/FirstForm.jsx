import React, {useEffect, useState} from 'react'

const FirstForm = ({settabno, setdata , data, setparenttab}) => {
   const [firsterror, setfirsterror] = useState({})

   const handlechange = (e)=>{
      setdata({...data, [e.target.name]: e.target.value});
   }

   const handleVarify = ()=>{
      if(varify()){
         settabno(2)
      }
   }

   const varify = ()=>{
      let valid = true;
      const localerror= {};
      
      if(data && data.firstName.length === 0){
         localerror.firstName = "FirstName is required!";
         valid = false;
      }else if(data && data.firstName.length < 4){
         localerror.firstName= "FirstName must be 4 characters.";
         valid= false;
      }

      if(data && data.lastName.length === 0){
         localerror.lastName = "LastName is required!";
         valid = false;
      }else if(data && data.lastName.length < 4){
         localerror.lastName = "LastName must be 4 characters.";
         valid= false;
      }

      if(data && data.age.length === 0){
         localerror.age = "Age is required!";
         valid = false;
      }

      if(data && data.phoneNo.length === 0){
         localerror.phoneNo = "Phone No. is required!";
         valid = false;
      }else if(data && data.phoneNo.length !== 10){
         localerror.phoneNo = "Phone No. must be 10 digits.";
         valid = false;
      }

      setfirsterror(localerror);
      return valid;
   }

   useEffect(()=> {
      
   },[]);

  return (
    <>
      <div className="w-50 border mx-auto p-4 my-5  shadow text-center">
         <h1 className='text-info'>Step 1</h1><hr />
         <div className="d-flex">
            <div className="w-50">
               <label className=' d-flex justify-content-between align-items-center mt-4 mr-3 text-info'><strong>First Name:</strong>
                  <input type="text" placeholder='First name...' className='form-control w-75 ' name='firstName' onChange={handlechange} value={data.firstName}/>
               </label>
               {firsterror.firstName && <p className='text-danger' >{firsterror.firstName}</p>}
            </div>
            <div className="w-50">
               <label className='d-flex justify-content-between align-items-center mt-4 ml-3 text-info'><strong>Last Name:</strong>
                  <input type="text" placeholder='Last name...' className='form-control w-75 ' name='lastName' onChange={handlechange} value={data.lastName}/>
               </label>
            {firsterror.lastName && <p className='text-danger' >{firsterror.lastName}</p>}
            </div>

         </div>
         {/* {error.name && <p className='text-danger' >{error.name}</p>} */}
         <div className="d-flex mb-4">
            <div className="w-50">
               <label className='d-flex justify-content-between align-items-center mt-4 mr-3 text-info'><strong>Age:</strong>
                  <input type="number" placeholder='Age...' className='form-control w-75 ' name='age' onChange={handlechange} value={data.age}/>
               </label>
               {firsterror.age && <p className='text-danger' >{firsterror.age}</p>}
            </div>
            <div className="w-50">
               <label className='d-flex justify-content-between align-items-center ml-3 mt-4 text-info'><strong>phoneNo:</strong>
                  <input type="number" placeholder='Phone number...' className='form-control w-75 ' name='phoneNo' onChange={handlechange} value={data.phoneNo}/>
               </label>
               {firsterror.phoneNo && <p className='text-danger' >{firsterror.phoneNo}</p>}
            </div>
         </div>
         <hr />
         <div className="d-flex justify-content-between mt-4">
            <button className='btn btn-outline-info px-4 ' onClick={()=>setparenttab(1)}>My Profile</button>
            <button className='btn btn-outline-info px-4' onClick={handleVarify}>Next</button>
         </div>
      </div>
    </>
  )
}

export default FirstForm
