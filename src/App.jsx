import React, { useContext } from "react";
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
import { userDataContext } from "./context/userContext";
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
// import AdminUpdateProduct from "./pages/admin/adminUpdateProduct.jsx";
import AdminSingleUser from "./pages/admin/AdminSingleUser.jsx";
import Address from "./pages/Address.jsx";
import PaymentSuccessul from "./pages/PaymentSuccessul.jsx";
import PaymentFaild from "./pages/PaymentFaild.jsx";
import MyOrder from "./pages/MyOrder.jsx";

function App() {
  const { userData } = useContext(userDataContext);
  const admin = userData?.role;
  console.log(admin);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/forgot-otp/:email" element={<ForgotOtp />} />
        <Route path="/change-password/:email" element={<ChangePassword />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<SingleProduct />} />

        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/order"
          element={userData ? <MyOrder /> : <Navigate to="/" />}
        />

        <Route
          path="/cart"
          element={ <Cart/>}
        />
        <Route
          path="/address"
          element={userData ? <Address /> : <Navigate to="/" />}
        />
        <Route path="/success" element={<PaymentSuccessul />} />
        <Route path="/fail" element={<PaymentFaild />} />
        <Route
          path="/dashboard"
          element={admin === "admin" ? <Dashboard /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/dashboard/sales"
          element={admin === "admin" ? <AdminSales /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/add-product"
          element={
            userData?.role === "admin" ? <AddProduct /> : <Navigate to="/" />
          }
        />
        <Route
          path="/dashboard/products"
          element={admin === "admin" ? <AdminProduct /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/orders"
          element={
            userData?.role === "admin" ? <AdminOrders /> : <Navigate to="/" />
          }
        />
        <Route
          path="/dashboard/user/orders/:id"
          element={admin === "admin" ? <ShowUserOrders /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/users"
          element={
            userData?.role === "admin" ? <AdminUsers /> : <Navigate to="/" />
          }
        />
        <Route
          path="/dashboard/single-user/:id"
          element={
            userData?.role === "admin" ? (
              <AdminSingleUser />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/dashboard/users/:id"
          element={admin === "admin" ? <UserInfo /> : <Navigate to="/" />}
        />

        <Route
          path="/dashboard/update-product/:id"
          element={
            admin === "admin" ? <AdminUpdateProduct /> : <Navigate to="/" />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
