import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Forgot from "./pages/Forgot";
import ForgotOtp from "./pages/ForgotOtp";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminSales from "./pages/admin/AdminSales.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import AdminProduct from "./pages/admin/AdminProduct.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import ShowUserOrders from "./pages/admin/ShowUserOrders.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import UserInfo from "./pages/admin/UserInfo.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import AdminUpdateProduct from "./pages/AdminUpdateProduct.jsx";
import AdminSingleUser from "./pages/admin/AdminSingleUser.jsx";
import Address from "./pages/Address.jsx";
import PaymentSuccessul from "./pages/PaymentSuccessul.jsx";
import PaymentFaild from "./pages/PaymentFaild.jsx";
import MyOrder from "./pages/MyOrder.jsx";

// Route Guards
import AdminRoute from "./components/routes/AdminRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import GuestRoute from "./components/routes/GuestRoute";

function App() {
  return (
    <div>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<PaymentSuccessul />} />
        <Route path="/fail" element={<PaymentFaild />} />

        {/* ================= GUEST ROUTES (Only accessible when logged out) ================= */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <GuestRoute>
              <Verify />
            </GuestRoute>
          }
        />
        <Route
          path="/verify/:token"
          element={
            <GuestRoute>
              <VerifyEmail />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot"
          element={
            <GuestRoute>
              <Forgot />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-otp/:email"
          element={
            <GuestRoute>
              <ForgotOtp />
            </GuestRoute>
          }
        />
        <Route
          path="/change-password/:email"
          element={
            <GuestRoute>
              <ChangePassword />
            </GuestRoute>
          }
        />

        {/* ================= PROTECTED USER ROUTES (Must be logged in) ================= */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/address"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN PROTECTED ROUTES (Admin only) ================= */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/sales"
          element={
            <AdminRoute>
              <AdminSales />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/products"
          element={
            <AdminRoute>
              <AdminProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/user/orders/:id"
          element={
            <AdminRoute>
              <ShowUserOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/single-user/:id"
          element={
            <AdminRoute>
              <AdminSingleUser />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/users/:id"
          element={
            <AdminRoute>
              <UserInfo />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/update-product/:id"
          element={
            <AdminRoute>
              <AdminUpdateProduct />
            </AdminRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
