import React, { useContext } from "react";
import { userDataContext } from "../../context/userContext";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/Sidebar";

function AdminOrders() {
  const { allOrders } = useContext(userDataContext);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block w-64 shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* স্মল ডিভাইসের জন্য pt-24 যোগ করা হয়েছে যাতে ন্যাভবার থেকে অনেক নিচে শুরু হয়।
           মোবাইলে ন্যাভবার অনেক সময় ফিক্সড থাকে, তাই এই গ্যাপটা জরুরি।
        */}
        <main className="flex-1 overflow-y-auto px-4 pb-8 pt-24 md:pt-16 md:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Page Header - mt-6 দিয়ে মোবাইলে আরও নিচে নামানো হয়েছে */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 mt-6 gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Order Management</h2>
                <p className="text-gray-500 text-sm mt-1">Manage and track all customer orders from here.</p>
              </div>
              <div className="bg-white shadow-sm border border-blue-100 px-4 py-2 rounded-lg w-full sm:w-auto">
                <span className="text-gray-500 text-xs uppercase font-bold block">Total Orders</span>
                <span className="text-blue-600 text-xl font-black">
                  {allOrders?.length || 0}
                </span>
              </div>
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                    <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Items</th>
                    <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Total Amount</th>
                    <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allOrders?.length > 0 ? (
                    allOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-blue-50/30 transition-all duration-200">
                        <td className="px-6 py-5 text-xs font-mono text-gray-400">#{order._id?.slice(-8)}</td>
                        <td className="px-6 py-5">
                          <div className="text-sm font-bold text-gray-900">{order.userId?.firstName} {order.userId?.lastName}</div>
                          <div className="text-xs text-gray-500">{order.userId?.email}</div>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded border font-medium">
                            {order.items?.reduce((a, i) => a + i.quantity, 0) || 0} Items
                          </span>
                        </td>
                        <td className="px-6 py-5 text-base font-black text-gray-900">৳{order.totalAmount?.toLocaleString("en-IN")}</td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-1.5">
                            <span className="inline-flex items-center justify-center w-max px-3 py-1 rounded-md text-[10px] font-bold uppercase bg-amber-100 text-amber-700 border border-amber-200">{order.orderStatus}</span>
                            <span className="inline-flex items-center justify-center w-max px-3 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 border border-emerald-200">{order.paymentStatus}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-500 font-medium">{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-32 text-gray-500">No orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            {/* mt-8 যোগ করা হয়েছে টাইটেল থেকে লিস্টকে আরও নিচে নামানোর জন্য */}
            <div className="md:hidden space-y-6 mt-8">
              {allOrders?.map((order) => (
                <div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">ID: #{order._id?.slice(-8)}</span>
                    <span className="text-lg font-black text-gray-900">৳{order.totalAmount?.toLocaleString("en-IN")}</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">{order.userId?.firstName} {order.userId?.lastName}</h4>
                  <p className="text-xs text-gray-500 mb-6 italic">{order.userId?.email}</p>
                  
                  <div className="flex justify-between items-end pt-4 border-t border-dashed border-gray-200">
                    <div className="flex flex-col gap-2">
                       <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] uppercase font-black rounded-full border border-amber-100">{order.orderStatus}</span>
                       <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] uppercase font-black rounded-full border border-emerald-100">{order.paymentStatus}</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        {new Date(order.createdAt).toLocaleDateString()}
                    </span>
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