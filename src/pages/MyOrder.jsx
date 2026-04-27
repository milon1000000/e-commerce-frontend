import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Order from "../components/Order";

function MyOrder() {
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const [order, setOrder] = useState([]); 

  const handleOrder = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/v1/order/get-order`, {
        withCredentials: true,
        headers: { user_id: userData._id },
      });
      setOrder(result.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      handleOrder();
    }
  }, [userData]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <Navbar />
      <Order order={order}/>
    </div>
  );
}

export default MyOrder;