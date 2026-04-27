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
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-pink-100 to-pink-200">
      <ToastContainer />
      <div className="max-w-md w-full bg-white shadow-2xl flex flex-col items-center justify-center px-8 py-10 rounded-2xl text-center">
        <div className="bg-pink-100 p-4 rounded-full mb-4">
          <MdEmail className="text-4xl text-green-500" />
        </div>

        <h2 className="text-xl font-semibold mb-4">Verify Your Email</h2>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verify;