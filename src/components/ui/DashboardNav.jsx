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
  const { userData, setUserData, addToCartData } =
    useContext(userDataContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.delete(`${serverUrl}/api/v1/user/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Logout successful");
        setUserData(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <header className="bg-pink-50 fixed top-0 w-full z-50 border-b border-pink-200 shadow-sm">
      
      {/* 🔥 relative parent */}
      <div className="relative max-w-7xl mx-auto flex items-center py-3 px-4 md:px-6">
        
        {/* ✅ Logo center on mobile */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          <img src="/Ekart.png" alt="logo" className="w-20" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          <Link to="/" className="font-semibold hover:text-pink-600">
            Home
          </Link>
          <Link to="/products" className="font-semibold hover:text-pink-600">
            Products
          </Link>

          {userData?.role === "admin" && (
            <Link to="/dashboard" className="font-semibold hover:text-pink-600">
              Dashboard
            </Link>
          )}

          {userData && (
            <div
              className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <img
                src={userData?.profileImage?.url || "/profile.jpg"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <Link to="/cart" className="relative text-pink-600">
            <FaCartPlus className="text-2xl" />
            <span className="absolute -top-3 -right-4 bg-pink-500 text-white text-xs rounded-full px-2">
              {addToCartData?.items?.length || 0}
            </span>
          </Link>

          {userData ? (
            <button
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md font-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md font-medium"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </nav>

        {/* ✅ Mobile Menu Icon */}
        <div className="md:hidden ml-auto">
          <div className="bg-white p-2 rounded-lg shadow-lg cursor-pointer text-2xl">
            {menuOpen ? (
              <FaTimes onClick={() => setMenuOpen(false)} />
            ) : (
              <FaBars onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white h-screen flex flex-col items-center gap-6 py-10 border-t shadow-lg">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>

          {userData?.role === "admin" && (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}

          {userData && (
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
          )}

          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart ({addToCartData?.items?.length || 0})
          </Link>

          {userData ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              Login
            </button>
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </header>
  );
}

export default DashboardNav;