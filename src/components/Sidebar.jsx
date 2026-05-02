import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuPackagePlus, LuPackageSearch, LuUsers } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-lg ${
      isActive ? "bg-pink-600 text-white" : "text-gray-700"
    } flex items-center gap-3 font-semibold p-3 rounded-xl w-full hover:bg-pink-600 hover:text-white duration-100`;

  const links = [
    { to: "/dashboard", icon: <TbLayoutDashboard />, label: "Dashboard" },
    { to: "/dashboard/add-product", icon: <LuPackagePlus />, label: "Add Product" },
    { to: "/dashboard/products", icon: <LuPackageSearch />, label: "Products" },
    { to: "/dashboard/users", icon: <LuUsers />, label: "Users" },
    { to: "/dashboard/orders", icon: <FaRegEdit />, label: "Orders" },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white text-black p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RxCross2 size={22} /> : <IoMenu size={22} />}
      </button>

      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-pink-50 border-r border-pink-200 p-6 z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo / Title */}
        <div className="mb-8 mt-2 pl-1">
          <h1 className="text-2xl font-bold text-pink-600">MyApp</h1>
        </div>

        <div className="space-y-2">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              {icon}
              <span className="whitespace-nowrap">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>

   
    </>
  );
}

export default Sidebar;