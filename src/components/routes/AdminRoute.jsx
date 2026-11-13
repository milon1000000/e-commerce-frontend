import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userDataContext } from "../../context/userContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function AdminRoute({ children }) {
  const { userData, authLoading } = useContext(userDataContext);
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
        <AiOutlineLoading3Quarters className="animate-spin text-3xl text-blue-600" />
        <p className="text-slate-500 text-sm font-medium">Verifying authorization...</p>
      </div>
    );
  }

  if (!userData) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (userData.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}

export default AdminRoute;
