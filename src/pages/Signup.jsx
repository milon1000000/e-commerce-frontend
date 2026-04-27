// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { FaEyeSlash } from "react-icons/fa";
// import { FaRegEye } from "react-icons/fa";
// import { authDataContext } from "../context/authContext";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// function Signup() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { serverUrl } = useContext(authDataContext);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/v1/user/register`,
//         formData,
//         { withCredentials: true },
//       );

//       if (result.data.success) {
//         navigate("/verify");
//         toast.success(
//           result.data.message || "Signup successful and sent to email",
//         );

//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           password: "",
//         });
//       }
//     } catch (error) {
//       console.log(error);

//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Something went wrong! Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen justify-center items-center bg-pink-100 px-3">
//       <Card className="w-full max-w-sm">
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="firstName">First Name</Label>
//                 <Input
//                   name="firstName"
//                   value={formData.firstName}
//                   type="text"
//                   placeholder="First Name"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <Input
//                   name="lastName"
//                   value={formData.lastName}
//                   type="text"
//                   placeholder="Last Name"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   name="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="grid gap-2 relative">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>
//                 </div>
//                 <Input
//                   name="password"
//                   type={`${showPassword ? "text" : "password"}`}
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 {showPassword ? (
//                   <FaRegEye
//                     className="absolute right-2 top-8 w-10"
//                     onClick={() => setShowPassword(!showPassword)}
//                   />
//                 ) : (
//                   <FaEyeSlash
//                     className="absolute right-2 top-8 w-10"
//                     onClick={() => setShowPassword(!showPassword)}
//                   />
//                 )}
//               </div>
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex-col gap-2">
//           <Button
//             disabled={loading}
//             type="button"
//             onClick={handleSubmit}
//             className="w-full bg-pink-500 hover:bg-pink-600 duration-500"
//           >
//             {loading ? (
//               <>
//                 <AiOutlineLoading3Quarters className="animate-spin text-white mx-auto" />
//               </>
//             ) : (
//               "Sign Up"
//             )}
//           </Button>
//           <p className="text-sm text-center text-gray-600">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="font-semibold text-pink-600 hover:text-pink-700 hover:underline transition duration-200"
//             >
//               Login
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//       <ToastContainer
//         position={window.innerWidth < 640 ? "top-center" : "top-right"}
//         autoClose={3000}
//         style={{ zIndex: 9999 }}
//         toastStyle={
//           window.innerWidth < 640
//             ? {
//                 width: "60%",
//                 fontSize: "14px",
//                 padding: "10px",
//                 minHeight: "50px",
//               }
//             : {}
//         }
//       />
//     </div>
//   );
// }

// export default Signup;

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
      toast.error(
        error.response?.data?.message ||
          "Something went wrong! Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-b from-pink-50 to-purple-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid gap-2">
            <label className="font-medium text-gray-700">First Name</label>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              placeholder="First Name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="grid gap-2">
            <label className="font-medium text-gray-700">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="grid gap-2">
            <label className="font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="m@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="grid gap-2 relative">
            <label className="font-medium text-gray-700">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            {showPassword ? (
              <FaRegEye
                className="absolute right-3 top-12 w-5 h-5 cursor-pointer text-gray-500 text-2xl"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-3 top-12 w-5 h-5 cursor-pointer text-gray-500 text-2xl"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium text-white ${
              loading
                ? "bg-pink-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700"
            } flex justify-center items-center gap-2`}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-pink-600 hover:text-pink-700 hover:underline transition duration-200"
          >
            Login
          </Link>
        </p>
      </div>

      <ToastContainer
        position={window.innerWidth < 640 ? "top-center" : "top-right"}
        autoClose={3000}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default Signup;
