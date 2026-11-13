import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePassword() {
  const { serverUrl } = useContext(authDataContext);
  const { setUserData } = useContext(userDataContext);
  const { email } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/user/change-password/${email}`,
        formData,
        { withCredentials: true }
      );

      if (result.data.success) {
        toast.success(result.data.message || "Password changed successfully!");
        setUserData(result.data.user);
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
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
            🔒
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Set New Password
          </h1>
          <p className="text-slate-500 text-sm mt-1">Please enter your new password below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* New Password */}
          <div className="relative flex flex-col gap-1.5">
            <label className="text-slate-700 text-sm font-semibold">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
            <div
              className="absolute right-3.5 top-9 text-slate-400 hover:text-slate-600 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative flex flex-col gap-1.5">
            <label className="text-slate-700 text-sm font-semibold">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
            <div
              className="absolute right-3.5 top-9 text-slate-400 hover:text-slate-600 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          {/* Submit Button */}
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
            {loading ? "Processing..." : "Update Password"}
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

export default ChangePassword;
