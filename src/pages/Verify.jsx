import React, { useState, useContext } from "react";
import { MdEmail } from "react-icons/md";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Verify() {
  const { serverUrl } = useContext(authDataContext);
  const { setUserData } = useContext(userDataContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/api/v1/user/verify`, {
        email,
        otp,
      });

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Optionally, you can set user data after verification
      // setUserData(response.data.user);

      setTimeout(() => {
        navigate("/login"); // redirect after 3 sec
      }, 3000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50/60 via-slate-50 to-blue-100/40">
      <ToastContainer />
      <div className="max-w-md w-full bg-white shadow-xl border border-slate-200/80 flex flex-col items-center justify-center p-8 rounded-2xl text-center">
        <div className="bg-blue-50 p-4 rounded-2xl mb-3 text-blue-600">
          <MdEmail className="text-4xl" />
        </div>

        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-2">Verify Your Email</h2>
        <p className="text-slate-500 text-sm mb-6">Enter your registered email and the 6-digit OTP code.</p>

        <form className="w-full flex flex-col gap-3.5" onSubmit={handleSubmit}>
          <div className="text-left flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <div className="text-left flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">OTP Code</label>
            <input
              type="text"
              maxLength={6}
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-sm hover:shadow transition-all active:scale-[0.99]"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verify;