import React from 'react';
import { useNavigate } from 'react-router-dom';

function Order({ order }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4">
      {order && order.length > 0 ? (
        order.map((singleOrder) => (
          <div
            key={singleOrder._id}
            className="bg-white rounded-2xl shadow-xs hover:shadow-md transition-all mb-6 overflow-hidden border border-slate-200/80"
          >
            {/* Order Header */}
            <div className="bg-slate-50/70 p-4 sm:p-5 border-b border-slate-200/80 flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Order ID</p>
                <p className="text-xs sm:text-sm font-mono text-slate-700 font-semibold">{singleOrder._id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Amount</p>
                <p className="text-base sm:text-lg font-bold text-blue-600">৳ {(singleOrder.totalAmount || 0).toLocaleString("en-IN")}</p>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    singleOrder.paymentStatus === 'paid'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {singleOrder.paymentStatus}
                </span>
              </div>
            </div>

            {/* Order Info Section */}
            {singleOrder.userId && (
              <div className="px-5 py-3 border-b border-slate-100 text-xs sm:text-sm grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600">
                <p><span className="font-semibold text-slate-700">Customer:</span> {singleOrder.userId.firstName || ''} {singleOrder.userId.lastName || ''}</p>
                <p><span className="font-semibold text-slate-700">Email:</span> {singleOrder.userId.email || 'N/A'}</p>
              </div>
            )}

            {/* Products List */}
            <div className="p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Items</h3>
              {singleOrder.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-xl border border-slate-200/60 mb-2.5 last:mb-0 hover:bg-slate-50 transition-all"
                >
                  <img 
                    src={item.productId?.productImg?.[0]?.url || "/placeholder.png"} 
                    alt="product" 
                    className="w-14 h-14 object-cover rounded-lg border border-slate-200 cursor-pointer bg-white"
                    onClick={() => item.productId?._id && navigate(`/products/${item.productId._id}`)}
                  />
                  <div className="flex-1 min-w-0">
                    <h4
                      className="text-sm font-semibold text-slate-800 line-clamp-1 hover:text-blue-600 cursor-pointer transition-colors"
                      onClick={() => item.productId?._id && navigate(`/products/${item.productId._id}`)}
                    >
                      {item.productId?.productName || "Product details unavailable"}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Price: ৳ {(item.price || 0).toLocaleString("en-IN")} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer/Status */}
            <div className="bg-slate-50/70 p-3 px-5 flex justify-between items-center border-t border-slate-200/80">
              <p className="text-xs text-slate-400">
                Placed on: {new Date(singleOrder?.createdAt).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 capitalize">
                  {singleOrder.orderStatus}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-xs">
          <p className="text-slate-400 font-medium">No orders found.</p>
        </div>
      )}
    </div>
  );
}

export default Order;
