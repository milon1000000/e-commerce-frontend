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
    <header className="bg-white/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-slate-200 shadow-xs">
      
      <div className="max-w-7xl mx-auto flex items-center py-3 px-4 md:px-6">

        {/* Desktop Logo */}
        <Link to="/" className="hidden md:block">
          <img src="/Ekart.png" alt="logo" className="w-20" />
        </Link>

        {/* Mobile Navbar */}
        <div className="md:hidden w-full flex justify-between items-center px-2">
          
          {/* LEFT → Logo */}
          <img
            src="/Ekart.png"
            alt="logo"
            className="w-16 ml-20"
          />

          {/* RIGHT → Menu Icon (NO BG) */}
          <div className="text-black text-2xl cursor-pointer mr-1">
            {menuOpen ? (
              <FaTimes onClick={() => setMenuOpen(false)} />
            ) : (
              <FaBars onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          <Link to="/" className="font-semibold text-slate-700 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/products" className="font-semibold text-slate-700 hover:text-blue-600 transition-colors">
            Products
          </Link>

          {userData?.role === "admin" && (
            <Link to="/dashboard" className="font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
          )}

          {userData && (
            <div
              className="w-9 h-9 rounded-full overflow-hidden cursor-pointer ring-2 ring-blue-500/30 hover:ring-blue-600 transition-all"
              onClick={() => navigate("/profile")}
            >
              <img
                src={userData?.profileImage?.url || "/profile.jpg"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <Link to="/cart" className="relative text-slate-700 hover:text-blue-600 transition-colors p-1">
            <FaCartPlus className="text-2xl" />
            <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[11px] font-bold rounded-full px-1.5 py-0.2 shadow-sm min-w-5 text-center">
              {addToCartData?.items?.length || 0}
            </span>
          </Link>

          {userData ? (
            <button
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg font-semibold transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-sm hover:shadow transition-all"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </nav>
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