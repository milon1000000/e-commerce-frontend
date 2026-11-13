import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { authDataContext } from "../context/authContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/user/register`,
        formData,
        { withCredentials: true },
      );

      if (result.data.success) {
        toast.success(
          result.data.message || "Signup successful! Check your email.",
        );
        navigate("/verify");
        setFormData({ firstName: "", lastName: "", email: "", password: "" });
      }
    } catch (error) {
      console.log(error);
      const errMsg =
        error.response?.data?.message ||
        (error.code === "ERR_NETWORK" || error.message === "Network Error"
          ? "Cannot connect to server. Please check if backend is running!"
          : error.message) ||
        "Something went wrong! Please try again.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-blue-50/60 via-slate-50 to-blue-100/40 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-bold text-2xl mb-3 shadow-xs">
            E
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Create an Account
          </h2>
          <p className="text-slate-500 text-sm mt-1">Get started with your free account today</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">First Name</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                placeholder="John"
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                placeholder="Doe"
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Password (min 8 chars)</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pr-10"
              required
            />
            {showPassword ? (
              <FaRegEye
                className="absolute right-3.5 top-9 w-4 h-4 cursor-pointer text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-3.5 top-9 w-4 h-4 cursor-pointer text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white shadow-sm hover:shadow transition-all mt-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
            } flex justify-center items-center gap-2`}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-slate-600 mt-6 border-t border-slate-100 pt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition duration-150"
          >
            Sign In
          </Link>
        </p>
      </div>

      <ToastContainer
        position={typeof window !== 'undefined' && window.innerWidth < 640 ? "top-center" : "top-right"}
        autoClose={3000}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default Signup;
