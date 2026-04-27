import React, { useContext } from "react";
import { userDataContext } from "../../context/userContext";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/Sidebar";

function AdminOrders() {
  const { allOrders } = useContext(userDataContext);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar />

        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <h2 className="text-2xl font-bold mb-6">Admin - All Orders</h2>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    User
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Products
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {allOrders?.length > 0 ? (
                  allOrders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      {/* ORDER ID */}
                      <td className="px-4 py-4 text-xs font-mono">
                        {order._id}
                      </td>

                      {/* USER */}
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium">
                          {order.userId?.firstName} {order.userId?.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.userId?.email}
                        </p>
                      </td>

                      {/* PRODUCTS */}
                      <td className="px-4 py-4 text-sm">
                        ×{" "}
                        {order.items?.reduce((a, i) => a + i.quantity, 0) || 0}
                      </td>

                      {/* AMOUNT (FIXED ৳) */}
                      <td className="px-4 py-4 font-bold">
                        ৳{order.totalAmount?.toLocaleString("en-IN")}
                      </td>

                      {/* STATUS */}
                      <td className="px-4 py-4 space-y-2">
                        <span className="block px-3 py-1 text-xs rounded-md border bg-yellow-50 text-yellow-700">
                          Order: {order.orderStatus}
                        </span>

                        <span className="block px-3 py-1 text-xs rounded-md border bg-green-50 text-green-600">
                          Payment: {order.paymentStatus}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden space-y-4">
            {allOrders?.length > 0 ? (
              allOrders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <p className="text-xs text-gray-500 break-all">{order._id}</p>

                  <p className="font-semibold mt-1">
                    {order.userId?.firstName} {order.userId?.lastName}
                  </p>

                  <p className="text-sm text-gray-500">{order.userId?.email}</p>

                  <div className="mt-2 text-sm">
                    <p>Items: × {order.items?.length || 0}</p>

                    {/* FIXED ৳ */}
                    <p className="font-bold">
                      <span className="text-2xl font-bold">
                        ৳{order.totalAmount?.toLocaleString("en-IN")}
                      </span>
                    </p>
                  </div>

                  <div className="mt-2 flex flex-col gap-1 text-xs">
                    <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded">
                      Order: {order.orderStatus}
                    </span>
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded">
                      Payment: {order.paymentStatus}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No orders found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
