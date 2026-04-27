import React from 'react'
import { useNavigate } from 'react-router-dom';

function Order({order}) {
  const navigate=useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4">

        {order && order.length > 0 ? (
          order.map((singleOrder) => (
            <div key={singleOrder._id} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden border border-gray-200">
              {/* Order Header */}
              <div className="bg-gray-100 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Order ID</p>
                  <p className="text-sm font-mono text-gray-700">{singleOrder._id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Amount</p>
                  <p className="text-lg font-bold text-blue-600">BDT {singleOrder.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${singleOrder.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {singleOrder.paymentStatus}
                    </span>
                </div>
              </div>

              {/* Order Info Section */}
              <div className="p-4 border-b border-gray-100 text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>User:</strong> {singleOrder.userId.firstName} {singleOrder.userId.lastName}</p>
                <p><strong>Email:</strong> {singleOrder.userId.email}</p>
              </div>

              {/* Products List */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Products:</h3>
                {singleOrder.items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-md border border-gray-100 mb-2">
                    <img 
                      src={item.productId.productImg[0]?.url} 
                      alt="product" 
                      className="w-16 h-16 object-cover rounded-md border border-gray-200"
                      onClick={()=>navigate(`/products/${item.productId._id}`)}
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-1">
                        {item.productId.productName}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Price: ₹{item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer/Status */}
              <div className="bg-gray-50 p-3 px-4 flex justify-between items-center border-t border-gray-100">
                <p className="text-xs text-gray-400 italic">Placed on: {new Date(singleOrder?.createdAt).toLocaleDateString()}</p>
                <p className="text-sm font-semibold text-orange-500 capitalize">{singleOrder.orderStatus}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No orders found.</p>
          </div>
        )}
      </div>
  )
}

export default Order
