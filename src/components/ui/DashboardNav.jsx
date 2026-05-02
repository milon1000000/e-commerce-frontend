import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../../context/authContext";
import { userDataContext } from "../../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashboardNav() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData, addToCartData } = useContext(userDataContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.delete(`${serverUrl}/api/v1/user/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Logout successful");
        setUserData(null);
        setMenuOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <header className="bg-white fixed top-0 w-full z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        
        {/* Mobile Left: Menu Toggle (No Background) */}
        <div className="md:hidden text-gray-700 text-2xl cursor-pointer">
          <FaBars onClick={() => setMenuOpen(true)} />
        </div>

        {/* Center/Left Logo */}
        <Link to="/" className="flex items-center">
          <img src="/Ekart.png" alt="logo" className="w-16 md:w-20" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 ml-auto">
          <Link to="/" className="text-gray-600 font-medium hover:text-pink-600 transition">Home</Link>
          <Link to="/products" className="text-gray-600 font-medium hover:text-pink-600 transition">Products</Link>

          {userData?.role === "admin" && (
            <Link to="/dashboard" className="text-gray-600 font-medium hover:text-pink-600 transition">Dashboard</Link>
          )}

          <Link to="/cart" className="relative text-gray-700 hover:text-pink-600 transition">
            <FaCartPlus className="text-2xl" />
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {addToCartData?.items?.length || 0}
            </span>
          </Link>

          {userData ? (
            <div className="flex items-center gap-4">
               <div className="w-9 h-9 rounded-full overflow-hidden border border-pink-200 cursor-pointer" onClick={() => navigate("/profile")}>
                <img src={userData?.profileImage?.url || "/profile.jpg"} alt="profile" className="w-full h-full object-cover" />
              </div>
              <button onClick={handleLogout} className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition">
              Login
            </button>
          )}
        </nav>

        {/* Mobile Right: Cart Icon */}
        <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative text-gray-700">
                <FaCartPlus className="text-2xl" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {addToCartData?.items?.length || 0}
                </span>
            </Link>
        </div>
      </div>

      {/* Mobile Sidebar (Left Side) */}
      <div className={`fixed inset-0 z-[60] transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)}></div>
        
        {/* Menu Content */}
        <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-2xl flex flex-col p-6">
          <div className="flex justify-between items-center mb-8">
            <img src="/Ekart.png" alt="logo" className="w-16" />
            <FaTimes className="text-2xl text-gray-500 cursor-pointer" onClick={() => setMenuOpen(false)} />
          </div>

          <div className="flex flex-col gap-5 text-gray-700 font-semibold">
            <Link to="/" className="hover:text-pink-600" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/products" className="hover:text-pink-600" onClick={() => setMenuOpen(false)}>Products</Link>
            
            {userData?.role === "admin" && (
              <Link to="/dashboard" className="hover:text-pink-600" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            )}

            {userData && (
              <Link to="/profile" className="hover:text-pink-600" onClick={() => setMenuOpen(false)}>My Profile</Link>
            )}

            <hr className="my-2 border-gray-100" />

            {userData ? (
              <button onClick={handleLogout} className="text-left text-red-500">Logout</button>
            ) : (
              <button onClick={() => { navigate("/login"); setMenuOpen(false); }} className="text-left text-pink-600">Login</button>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </header>
  );
}

export default DashboardNav;