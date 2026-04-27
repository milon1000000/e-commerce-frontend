import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);

  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [addToCartData, setAddToCartData] = useState({ items: [] });
  const [allUsers, setAllUsers] = useState(null);
  const [allOrders, setAllOrders] = useState(null);

 
  const getCurrentUser = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/v1/user/get-current`,
        { withCredentials: true }
      );
      setUserData(result.data.user);
    } catch (error) {
      console.log("USER ERROR:", error);
    }
  };

 
  const getAllProduct = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/v1/product/getAllProduct`,
        { withCredentials: true }
      );
      setProductData(result.data.products);
    } catch (error) {
      console.log("PRODUCT ERROR:", error);
    }
  };

  
  const getAddToCart = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/v1/cart/`,
        { withCredentials: true }
      );

      setAddToCartData(
        result.data.cart ? { ...result.data.cart } : { items: [] }
      );
    } catch (error) {
      console.log("CART ERROR:", error);
    }
  };

 
  const getAllUsers = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/v1/user/all-user`,
        { withCredentials: true }
      );
      setAllUsers(result.data.users);
    } catch (error) {
      console.log("USERS ERROR:", error);
    }
  };

  
  const getAllOrders = async () => {
    try {
      console.log("🔥 Calling Orders API...");

      const result = await axios.get(
        `${serverUrl}/api/v1/order/get-all-orders`,
        { withCredentials: true }
      );

      console.log("ORDERS DATA:", result.data);
      setAllOrders(result.data.orders || result.data.order);
    } catch (error) {
      console.log("ORDERS ERROR:", error.response?.data || error.message);
    }
  };

  
  useEffect(() => {
    getCurrentUser();
    getAllProduct();
    getAddToCart();
    getAllUsers();
  }, []);

 
  useEffect(() => {
    if (userData?._id) {
      getAllOrders();
    }
  }, [userData?._id]);

  return (
    <userDataContext.Provider
      value={{
        userData,
        setUserData,
        productData,
        setProductData,
        addToCartData,
        setAddToCartData,
        allUsers,
        setAllUsers,
        allOrders,
        setAllOrders,
        getCurrentUser,
        getAllUsers,
        getAllOrders,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;