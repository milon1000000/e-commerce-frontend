import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function VerifyEmail() {
  const{token}=useParams()
  const[status,setStatus]=useState("Verifying...");
  const{serverUrl}=useContext(authDataContext);
  const navigete=useNavigate()
  const Verifyemail=async()=>{
    try{
     const result=await axios.post(`${serverUrl}/api/v1/user/verify`,{},{
      headers:{
        Authorization:`Bearer ${token}`
      }
     })
     if(result.data.success){
      setStatus("Email Verified Successfully");
      setTimeout(() => {
        navigete("/login")
      }, 2000);
     }
    }catch(error){
      console.log(error);
      setStatus("Verification failed. Please try again")
    }
  }

  useEffect(()=>{
  Verifyemail();
  },[token])
  return (
    <div className='w-full h-screen flex items-center justify-center bg-pink-100'>
      <div className='w-150 h-20 bg-white shadow-lg p-5 flex items-center justify-center rounded-lg'>
        <h1 className='text-2xl font-semibold text-green-700'>{status}</h1>
      </div>
    </div>
  )
}

export default VerifyEmail;
