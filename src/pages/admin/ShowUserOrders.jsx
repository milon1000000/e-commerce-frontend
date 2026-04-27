import React, { useContext, useEffect, useState } from "react";
import { authDataContext } from "../../context/authContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/ui/Navbar";
import Order from "../../components/Order";
import { FiLoader } from "react-icons/fi";

function ShowUserOrders() {
  const { serverUrl } = useContext(authDataContext);
  const [order, setShowOrder] = useState(null);

  const { id } = useParams();

  const handleShow = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/v1/order/showUserOrders/${id}`,
        { withCredentials: true }
      );

      setShowOrder(result.data.order);
    } catch (error) {
      console.log(error);
      setShowOrder([]);
    }
  };

  useEffect(() => {
    handleShow();
  }, [id]);

  const user = order?.[0]?.userId;

  if (order === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <FiLoader className="animate-spin text-5xl text-gray-600" />
      </div>
    );
  }

  return (
    <div className="pt-20 ">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {order.length > 0
            ? `${user.firstName} ${user.lastName} Orders`
            : "This user has no orders"}
        </h2>
      </div>

      {order.length > 0 && <Order order={order} />}
    </div>
  );
}

export default ShowUserOrders;