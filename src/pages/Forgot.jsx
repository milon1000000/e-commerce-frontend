import React, { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Forgot() {
  const { serverUrl } = useContext(authDataContext);
  const { setUserData } = useContext(userDataContext);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/user/forgot-password`,
        formData,
        { withCredentials: true }
      );

      if (result.data.success) {
        toast.success(result.data.message || "Reset link sent!");
        setUserData(result.data.user);
        setTimeout(() => navigate(`/forgot-otp/${formData.email}`), 800);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/60 via-slate-50 to-blue-100/40 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-bold text-2xl mb-3 shadow-xs">
            🔑
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 mb-1.5 tracking-tight">
            Forgot Password
          </h1>
          <p className="text-slate-500 text-sm">
            Enter your email to receive a password reset OTP.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 text-sm font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all shadow-sm hover:shadow flex justify-center items-center gap-2 mt-2 ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
            }`}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            {loading ? "Sending..." : "Send Reset OTP"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-slate-600 text-sm border-t border-slate-100 pt-4">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position={typeof window !== 'undefined' && window.innerWidth < 640 ? "top-center" : "top-right"}
        autoClose={3000}
      />
    </div>
  );
}

export default Forgot;
