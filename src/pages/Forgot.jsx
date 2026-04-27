// import React, { useContext, useState } from "react";
// import { Button } from "../components/ui/button";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Link, useNavigate } from "react-router-dom";
// import { authDataContext } from "../context/authContext";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { userDataContext } from "../context/userContext";

// function Forgot() {
//   const { serverUrl } = useContext(authDataContext);
//   const { setUserData } = useContext(userDataContext);

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/v1/user/forgot-password`,
//         formData,
//         { withCredentials: true }
//       );

//       if (result.data.success) {
//         toast.success(result.data.message || "Reset link sent!");
//         setUserData(result.data.user);
//         setTimeout(() => navigate(`/forgot-otp/${formData.email}`), 800);
//       }
//     } catch (error) {
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Something went wrong!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-linear-to-r from-pink-100 to-purple-100 px-4">
//       <Card className="w-full max-w-md shadow-lg border border-pink-200">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold text-pink-600">
//             Forgot Password
//           </CardTitle>
//           <CardDescription>
//             Enter your email to receive a password reset otp.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             <div className="grid gap-2">
//               <Label>Email Address</Label>
//               <Input
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-pink-500 hover:bg-pink-600 text-white"
//               disabled={loading}
//             >
//               {loading ? (
//                 <AiOutlineLoading3Quarters className="animate-spin text-lg" />
//               ) : (
//                 "Send Reset OTP"
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

// export default Forgot;


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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-pink-200 p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-pink-600 mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600 text-sm">
            Enter your email to receive a password reset OTP.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-medium text-white transition flex justify-center items-center gap-2 ${
              loading ? "bg-pink-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            {loading ? "Sending..." : "Send Reset OTP"}
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

export default Forgot;