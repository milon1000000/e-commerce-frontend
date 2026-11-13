import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/userContext";
import Order from "../components/Order";
import Pagination from "../components/ui/Pagination";

function MyOrder() {
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const [order, setOrder] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleOrder = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/v1/order/get-order`, {
        withCredentials: true,
        headers: { user_id: userData._id },
      });
      setOrder(result.data.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      handleOrder();
    }
  }, [userData]);

  const totalOrders = order || [];
  const totalPages = Math.ceil(totalOrders.length / itemsPerPage);
  const paginatedOrders = totalOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Orders</h1>
        <p className="text-slate-500 text-sm">Track and review your previous orders</p>
      </div>

      <Order order={paginatedOrders}/>

      {totalOrders.length > itemsPerPage && (
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-xs">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalOrders.length}
              itemsPerPage={itemsPerPage}
              itemName="orders"
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrder;