// import React, { useContext, useState } from "react";
// import { Button } from "../components/ui/button";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { useParams, useNavigate, Link } from "react-router-dom";
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
// import { authDataContext } from "../context/authContext";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { userDataContext } from "../context/userContext";

// function ForgotOtp() {
//   const { serverUrl } = useContext(authDataContext);
//   const { setUserData } = useContext(userDataContext);

//   const { email } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [otp, setOtp] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/v1/user/verify-otp/${email}`,
//         { otp },
//         { withCredentials: true },
//       );

//       if (result.data.success) {
//         toast.success(result.data.message || "OTP Verified");
//         setUserData(result.data.user);
//         setTimeout(() => navigate(`/change-password/${email}`), 800);
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Invalid OTP or something went wrong",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 px-4">
//       <Card className="w-full max-w-md shadow-xl border border-pink-200">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold text-pink-600">
//             Verify OTP
//           </CardTitle>
//           <CardDescription>
//             Enter the OTP sent to <span className="font-semibold">{email}</span>
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             <div className="grid gap-2">
//               <Label>OTP Code</Label>
//               <Input
//                 type="text"
//                 maxLength={6}
//                 placeholder="Enter 6 digit OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="text-center tracking-widest text-lg"
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
//                 "Verify OTP"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>

//       <ToastContainer
//         position={window.innerWidth < 640 ? "top-center" : "top-right"}
//         autoClose={3000}
//       />
//     </div>
//   );
// }

// export default ForgotOtp;



import React, { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams, useNavigate, Link } from "react-router-dom";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotOtp() {
  const { serverUrl } = useContext(authDataContext);
  const { setUserData } = useContext(userDataContext);

  const { email } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/user/verify-otp/${email}`,
        { otp },
        { withCredentials: true }
      );

      if (result.data.success) {
        toast.success(result.data.message || "OTP Verified");
        setUserData(result.data.user);
        setTimeout(() => navigate(`/change-password/${email}`), 800);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP or something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 px-4">
      {/* OTP Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-pink-200 p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-pink-600 mb-2">
            Verify OTP
          </h1>
          <p className="text-gray-600 text-sm">
            Enter the OTP sent to{" "}
            <span className="font-semibold">{email}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">OTP Code</label>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6 digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-pink-400"
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
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Didn't receive the OTP?{" "}
          <Link
            to="/forgot"
            className="text-pink-600 font-semibold hover:underline"
          >
            Resend
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

export default ForgotOtp;