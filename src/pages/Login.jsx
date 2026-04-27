import React, { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { serverUrl } = useContext(authDataContext);
  const { setUserData,setAllUsers,getAllUsers } = useContext(userDataContext);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/user/login`,
        formData,
        { withCredentials: true }
      );

      if (result.data.success) {
        toast.success(result.data.message || "Login Successful");
        setUserData(result.data.user);
        setAllUsers(result.data.users);
        getAllUsers();
 
        setTimeout(() => navigate("/"), 500);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-linear-to-r from-pink-100 to-purple-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-xl border border-pink-200 p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-pink-600">Login</h1>
          <p className="text-gray-600 text-sm">Enter your email and password</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 relative">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Password</label>
              <Link
                to="/forgot"
                className="text-pink-500 text-sm font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <div
              className="absolute flex items-center justify-center right-3 top-11 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
             {showPassword ? <FaRegEye className="text-2xl" /> : <FaEyeSlash className="text-2xl" />}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-medium text-white transition flex justify-center items-center gap-2 ${
              loading ? "bg-pink-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-500 font-semibold hover:underline hover:text-pink-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position={window.innerWidth < 640 ? "top-center" : "top-right"}
        autoClose={3000}
      />
    </div>
  );
}

export default Login;