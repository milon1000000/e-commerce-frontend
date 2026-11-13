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
    `text-base ${
      isActive
        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
    } flex items-center gap-3 font-semibold px-4 py-3 rounded-xl w-full transition-all duration-150`;

  const links = [
    { to: "/dashboard", icon: <TbLayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/dashboard/add-product", icon: <LuPackagePlus size={20} />, label: "Add Product" },
    { to: "/dashboard/products", icon: <LuPackageSearch size={20} />, label: "Products" },
    { to: "/dashboard/users", icon: <LuUsers size={20} />, label: "Users" },
    { to: "/dashboard/orders", icon: <FaRegEdit size={20} />, label: "Orders" },
  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white text-slate-700 border border-slate-200 p-2 rounded-lg shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RxCross2 size={22} /> : <IoMenu size={22} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 p-6 z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo / Header */}
        <div className="mb-6 mt-1 pl-1">
          <h1 className="text-xl font-extrabold text-blue-600 tracking-tight">Admin Portal</h1>
          <p className="text-xs text-slate-400">Management & Controls</p>
        </div>

        {/* Links */}
        <div className="space-y-1.5">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;