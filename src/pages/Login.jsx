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
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        (error.code === "ERR_NETWORK" || error.message === "Network Error"
          ? "Cannot connect to server. Please check if backend is running!"
          : error.message) ||
        "Something went wrong! Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/60 via-slate-50 to-blue-100/40 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-bold text-2xl mb-3 shadow-xs">
            E
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-1">Please enter your credentials to login</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 text-sm font-semibold">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 relative">
            <div className="flex items-center justify-between">
              <label className="text-slate-700 text-sm font-semibold">Password</label>
              <Link
                to="/forgot"
                className="text-blue-600 text-xs font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pr-11"
              required
            />
            <div
              className="absolute flex items-center justify-center right-3 top-9 cursor-pointer text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
             {showPassword ? <FaRegEye className="text-xl" /> : <FaEyeSlash className="text-xl" />}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all shadow-sm hover:shadow flex justify-center items-center gap-2 mt-2 ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
            }`}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-7 text-center text-slate-600 text-sm border-t border-slate-100 pt-5">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition"
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