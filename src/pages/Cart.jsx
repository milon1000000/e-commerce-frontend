import React, { useContext, useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import { userDataContext } from "../context/userContext";
import { authDataContext } from "../context/authContext";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { addToCartData, setAddToCartData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/v1/cart`, {
          withCredentials: true,
        });
        setAddToCartData(res.data.cart || { items: [], totalPrice: 0 });
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };
    fetchCart();
  }, [serverUrl, setAddToCartData]);

  const subtotal = addToCartData?.totalPrice || 0;
  const shipping = subtotal > 299 ? 0 : 10;
  const total = subtotal + shipping;

  const handleQuantity = async (productId, type) => {
    try {
      setAddToCartData((prev) => {
        const updatedItems = prev.items.map((item) => {
          if (item.productId._id === productId) {
            const newQuantity =
              type === "increase"
                ? item.quantity + 1
                : Math.max(item.quantity - 1, 1);
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        const filteredItems =
          type === "decrease"
            ? updatedItems.filter((i) => i.quantity > 0)
            : updatedItems;
        const newTotal = filteredItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        return { ...prev, items: filteredItems, totalPrice: newTotal };
      });

      const res = await axios.put(
        `${serverUrl}/api/v1/cart/update`,
        { productId, type },
        { withCredentials: true }
      );
      setAddToCartData(res.data.cart);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      setAddToCartData((prev) => {
        const updatedItems = prev.items.filter(
          (item) => item.productId._id !== productId
        );
        const newTotal = updatedItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        return { ...prev, items: updatedItems, totalPrice: newTotal };
      });

      const res = await axios.delete(`${serverUrl}/api/v1/cart/remove`, {
        data: { productId },
        withCredentials: true,
      });
      setAddToCartData(res.data.cart);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <Navbar />
      {addToCartData?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {addToCartData.items.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item?.productId?.productImg?.[0]?.url || "/profile.webp"}
                      alt={item?.productId?.productName}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 w-full text-center sm:text-left">
                    <h2 className="font-medium text-gray-800 line-clamp-1">
                      {item?.productId?.productName}
                    </h2>
                    <p className="text-gray-900 font-semibold mt-1">
                      <span className="text-2xl">৳</span>
                      {item?.price?.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="flex items-center border rounded-lg bg-gray-100">
                      <button
                        className="px-3 py-1 border-r hover:bg-gray-200 transition"
                        onClick={() => handleQuantity(item.productId._id, "decrease")}
                      >
                        -
                      </button>
                      <span className="px-4 font-medium">{item?.quantity}</span>
                      <button
                        className="px-3 py-1 border-l hover:bg-gray-200 transition"
                        onClick={() => handleQuantity(item.productId._id, "increase")}
                      >
                        +
                      </button>
                    </div>

                    <div className="min-w-20 text-right">
                      <span className="font-semibold text-gray-800">
                        <span className="text-2xl">৳</span>
                        {(item?.price * item?.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium"
                      onClick={() => deleteProduct(item.productId._id)}
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="p-6 md:p-8 bg-white rounded-xl shadow-md sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({addToCartData?.items?.length} items)</span>
                  <span className="font-medium text-gray-800">
                    ৳{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-800">
                    ৳{shipping === 0 ? "0" : shipping}
                  </span>
                </div>

                <hr className="my-4 border-gray-200" />

                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-2xl font-black">
                    ৳{total.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Promo Code"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
                    />
                    <button className="px-4 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      Apply
                    </button>
                  </div>

                  <button 
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-bold uppercase transition" 
                    onClick={() => navigate("/address")}
                  >
                    Place Order
                  </button>

                  <button
                    className="w-full py-2 rounded-xl font-bold text-gray-700 border border-gray-200 hover:bg-gray-50 transition"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="pt-6 text-sm text-gray-400 space-y-1">
                  <p>* Free shipping on orders over ৳299</p>
                  <p>* 30-days return policy</p>
                  <p>* Secure checkout with SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-32">
          <p className="text-gray-500 text-xl">Your cart is empty</p>
          <button
            className="text-blue-600 mt-2 underline font-medium"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;