import React, { useContext } from "react";
import { userDataContext } from "../../context/userContext";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/Sidebar";

function AdminOrders() {
  const { allOrders } = useContext(userDataContext);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Fixed width on desktop */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Total Orders: {allOrders?.length || 0}
              </span>
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {allOrders?.length > 0 ? (
                    allOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-xs font-mono text-gray-400">
                          #{order._id?.slice(-8)} {/* ID টা ছোট করে দেখালে সুন্দর লাগে */}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {order.userId?.firstName} {order.userId?.lastName}
                          </div>
                          <div className="text-xs text-gray-500">{order.userId?.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                          {order.items?.reduce((a, i) => a + i.quantity, 0) || 0} Products
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                          ৳{order.totalAmount?.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {order.orderStatus}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {order.paymentStatus}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString('en-GB')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-20 text-gray-400">
                        No orders found in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="md:hidden space-y-4">
              {allOrders?.map((order) => (
                <div key={order._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-mono text-gray-400">#{order._id?.slice(-8)}</span>
                    <span className="text-sm font-bold text-gray-900">৳{order.totalAmount?.toLocaleString("en-IN")}</span>
                  </div>
                  <h4 className="font-bold text-gray-800">{order.userId?.firstName} {order.userId?.lastName}</h4>
                  <p className="text-xs text-gray-500 mb-4">{order.userId?.email}</p>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <div className="flex gap-2">
                       <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-[10px] uppercase font-bold rounded">
                        {order.orderStatus}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminOrders;