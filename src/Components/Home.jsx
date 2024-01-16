import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import products from "../ProjectData/products"

const Home = () => {
   const [checkloginn, setcheckloginn] = useState(0);
   const [allproducts, setallproducts] = useState([])
   const [slideindex, setslideindex] = useState(0)
   const [searchtext, setsearchtext] = useState("")


   //  For Image and discount slider
   setInterval(() => {
      if(slideindex < allproducts.length-1){
         setslideindex(slideindex + 1)
      }
      else{
         setslideindex(0);
      }
   }, 4000);

   const handlesearchtext = (e)=>{
      setsearchtext(e.target.value);
   }

// This is home search function
   const handlesearch = ()=>{
      const newproducts = products.filter((e)=>{
         return(  
            e.description.toLowerCase().includes(searchtext.toLowerCase()) ||
            e.name.toLowerCase().includes(searchtext.toLowerCase()) ||
            e.price.toString().toLowerCase().includes(searchtext.toLowerCase())
         )
      }) || []

      setallproducts(newproducts)
      console.log("searchtext", newproducts)
   }

   useEffect(()=>{
      const logdata = JSON.parse(sessionStorage.getItem("LoginData"))|| {}

      const checklogin = Object.entries(logdata).length;
      setcheckloginn(checklogin);

      setallproducts(products);

   },[])
  return (
    <>
      {checkloginn > 0 &&
      <div className="w-100">
         <div className="w-100 mx-auto shadow border d-flex">
               {
                  allproducts.map((e, i)=>{
                     return(
                        <>
                           {slideindex === i && 
                           <div className="w-100 slider-image d-flex" style={{Height:"300px"}}>
                              <img src={e.image} className=" card-img-top" alt="Image Not found" height={348} style={{width:"50%"}} />
                              <div className="py-3 px-4 w-50 text-center" style={{backgroundImage:"linear-gradient(to right, rgb(253, 252, 251), rgb(192 163 139))"}}>
                                 <h2 className='mx-auto text-danger mt-5'><strong><span className='text-success'>50</span><span className='text-dark'>%</span> Off</strong></h2>
                                 <h1 style={{fontSize:"50px"}}><strong>Order Now<sup className='text-danger'>*</sup></strong></h1>
                                 <button className="btn btn-outline-success mt-3">ORDER</button>
                              </div>
                           </div>
                           }
                        </>
                     )
                  })
               }
            
         </div>
         <div className="w-75 mx-auto text-center my-2 shadow border px-4 py-4 ">
            <div className="header-section">
               <div className="d-flex justify-content-between">
                  <h1>All Products </h1>
                  <div className="d-flex w-50">
                     <input className="form-control sm-2 w-100" type="text" placeholder="Search..." onChange={handlesearchtext} />
                     <div className=""><button className="btn btn-outline-success my-2 my-sm-0 mr-3" onClick={handlesearch}>Search</button> </div>  
                  </div>
               </div>

            </div><hr />
            <div className="allproducts d-flex flex-wrap justify-content-between">
            {
               allproducts.map((e)=>{
                  return(
                     <div key={e.id} className="card mt-3" style={{width:"17rem"}}>
                        <img src={e.image} className="card-img-top" alt="Image Not found" height={175}/>
                        <div className="card-body">
                           <h5 className="card-title">{e.name}</h5>
                           <p className="card-text">{e.description}</p>
                           <a href="#" className="btn btn-primary">${e.price}</a>
                        </div>
                     </div>
                  )
               })
            }
            </div>
         </div>
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

export default Home
