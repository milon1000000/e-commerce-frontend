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
    <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/60 via-slate-50 to-blue-100/40 px-4'>
      <div className='w-full max-w-md bg-white shadow-xl border border-slate-200/80 p-8 flex flex-col items-center justify-center rounded-2xl text-center'>
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold mb-3">
          ✓
        </div>
        <h1 className='text-xl font-bold text-slate-800'>{status}</h1>
      </div>
    </div>
  )
}

export default VerifyEmail;
