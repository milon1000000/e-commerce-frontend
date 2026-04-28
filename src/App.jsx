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
          element={<Profile />}
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
          element={<Dashboard/>}
        ></Route>
        <Route
          path="/dashboard/sales"
          element={<AdminSales/>}
        />
        <Route
          path="/dashboard/add-product"
          element={
             <AddProduct/>
          }
        />
        <Route
          path="/dashboard/products"
          element={<AdminProduct />}
        />
        <Route
          path="/dashboard/orders"
          element={
            <AdminOrders />
          }
        />
        <Route
          path="/dashboard/user/orders/:id"
          element={<ShowUserOrders /> }
        />
        <Route
          path="/dashboard/users"
          element={
             <AdminUsers /> 
          }
        />
        <Route
          path="/dashboard/single-user/:id"
          element={
              <AdminSingleUser />
            
          }
        />
        <Route
          path="/dashboard/users/:id"
          element={<UserInfo /> }
        />

        <Route
          path="/dashboard/update-product/:id"
          element={
             <AdminUpdateProduct />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
