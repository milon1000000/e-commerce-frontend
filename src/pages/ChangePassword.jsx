// import React, { useContext, useState } from "react";
// import { Button } from "../components/ui/button";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { authDataContext } from "../context/authContext";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { userDataContext } from "../context/userContext";

// function ChangePassword() {
//   const { serverUrl } = useContext(authDataContext);
//   const { setUserData } = useContext(userDataContext);
//   const { email } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     newPassword: "",
//     confirmPassword: "",
//   });

//   // show/hide password state
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (formData.newPassword !== formData.confirmPassword) {
//       toast.error("Passwords do not match!");
//       setLoading(false);
//       return;
//     }

//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/v1/user/change-password/${email}`,
//         formData,
//         { withCredentials: true },
//       );

//       if (result.data.success) {
//         toast.success(result.data.message || "Password changed successfully!");
//         setUserData(result.data.user);
//         setTimeout(() => navigate("/login"), 1000);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-linear-to-r from-pink-100 to-purple-100 px-4">
//       <Card className="w-full max-w-md shadow-lg border border-pink-200">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold text-pink-600">
//             Change Password
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             {/* New Password */}
//             <div className="relative grid gap-2">
//               <Label>New Password</Label>
//               <Input
//                 name="newPassword"
//                 type={showNewPassword ? "text" : "password"}
//                 placeholder="Enter new password"
//                 value={formData.newPassword}
//                 onChange={handleChange}
//               />
//               {/* Toggle Icon */}
//               {showNewPassword ? (
//                 <FaEye
//                   className="absolute right-3 top-8 text-xl cursor-pointer text-gray-500"
//                   onClick={() => setShowNewPassword(false)}
//                 />
//               ) : (
//                 <FaEyeSlash
//                   className="absolute right-3 top-8 text-xl cursor-pointer text-gray-500"
//                   onClick={() => setShowNewPassword(true)}
//                 />
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div className="relative grid gap-2">
//               <Label>Confirm Password</Label>
//               <Input
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm new password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//               {/* Toggle Icon */}
//               {showConfirmPassword ? (
//                 <FaEye
//                   className="absolute right-3 top-8 text-xl cursor-pointer text-gray-500"
//                   onClick={() => setShowConfirmPassword(false)}
//                 />
//               ) : (
//                 <FaEyeSlash
//                   className="absolute right-3 top-8 text-xl cursor-pointer text-gray-500"
//                   onClick={() => setShowConfirmPassword(true)}
//                 />
//               )}
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium"
//               disabled={loading}
//             >
//               {loading ? (
//                 <AiOutlineLoading3Quarters className="animate-spin text-lg" />
//               ) : (
//                 "Change Password"
//               )}
//             </Button>
//           </form>
//         </CardContent>

//         <CardFooter className="flex justify-center">
//           <p className="text-sm text-gray-600">
//             Remember your password?{" "}
//             <Link
//               to="/login"
//               className="text-pink-600 font-semibold hover:underline"
//             >
//               Login
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>

//       <ToastContainer
//         position={window.innerWidth < 640 ? "top-center" : "top-right"}
//         autoClose={3000}
//       />
//     </div>
//   );
// }

// export default ChangePassword;


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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-pink-200 p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-pink-600">
            Change Password
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* New Password */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <div
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <div
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-medium text-white transition ${
              loading
                ? "bg-pink-400 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600"
            } flex justify-center items-center gap-2`}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            {loading ? "Processing..." : "Change Password"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
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

export default ChangePassword;