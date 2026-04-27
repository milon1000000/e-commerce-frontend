import React, { useContext, useState, useEffect } from "react";
import { userDataContext } from "../context/userContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Address() {
  const { userData, setUserData, addToCartData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    phone: "",
    postCode: "",
  });

  const [savedAddress, setSavedAddress] = useState(null);
  const [savingAddress, setSavingAddress] = useState(false);
  const [payingLoading, setPayingLoading] = useState(false);

  useEffect(() => {
    if (userData?.address) {
      setSavedAddress(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddress = async () => {
    if (!formData.address || !formData.phone) return;
    setSavingAddress(true);
    try {
      const result = await axios.put(
        `${serverUrl}/api/v1/user/address`,
        formData,
        { withCredentials: true },
      );
      if (result.data.success) {
        setUserData(result.data.createAddress);
        setSavedAddress(result.data.createAddress);
        setFormData({ address: "", city: "", phone: "", postCode: "" });
      }
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setSavingAddress(false);
    }
  };

  const subtotal = addToCartData?.totalPrice || 0;
  const shipping = subtotal > 299 ? 0 : 10;
  const total = subtotal + shipping;

  const payment = async (paymentId) => {
    setPayingLoading(true);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/v1/order/payment-bkash`,
        { paymentId },
        { withCredentials: true },
      );
      if (data.success) {
        window.location.replace(data.url);
      }
    } catch (error) {
      console.log(error);
      setPayingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Delivery Address
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Confirm your shipping information to place order
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Add New Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Street address
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. 123 Main Street"
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  City
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Dhaka"
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Post code
                </label>
                <input
                  name="postCode"
                  value={formData.postCode}
                  onChange={handleChange}
                  placeholder="1212"
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Phone Number
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-pink-400">
                  <span className="text-sm text-gray-500 px-4 bg-gray-50 border-r border-gray-100">
                    +880
                  </span>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1XXXXXXXXX"
                    className="flex-1 px-4 py-2.5 text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddress}
              disabled={!formData.address || !formData.phone || savingAddress}
              className={`w-full mt-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                !formData.address || !formData.phone || savingAddress
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-black shadow-md"
              }`}
            >
              {savingAddress ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Save Address"
              )}
            </button>
          </div>

          {savedAddress && (
            <div className="bg-white rounded-xl border border-pink-200 p-6 shadow-sm border-l-4 border-l-pink-500">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Current Delivery Address
                    </p>
                    <p className="text-[10px] uppercase font-bold text-pink-500 tracking-wide">
                      Primary Profile Address
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFormData(savedAddress)}
                  className="text-xs font-bold text-gray-400 hover:text-pink-600 border border-gray-100 px-3 py-1 rounded-md hover:bg-pink-50 transition-all"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-y-4">
                {[
                  { label: "Address", value: savedAddress.address },
                  { label: "City", value: savedAddress.city },
                  { label: "Post code", value: savedAddress.postCode },
                  { label: "Contact", value: `+880 ${savedAddress.phone}` },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">
                      {label}
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                      {value || "—"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-md sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>
                  Subtotal ({addToCartData?.items?.length || 0} items)
                </span>
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
              <hr className="my-4 border-gray-100" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-gray-900">
                  ৳{total.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="pt-6 space-y-3">
                <button
                  disabled={!savedAddress || payingLoading}
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${
                    !savedAddress || payingLoading
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-pink-600 text-white hover:bg-pink-700 shadow-pink-100 active:scale-[0.95]"
                  }`}
                  onClick={() => payment(userData?._id)}
                >
                  {payingLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Pay"
                  )}
                </button>

                <button
                  className="w-full py-2.5 rounded-xl font-bold text-gray-500 border border-gray-100 hover:bg-gray-50 transition-all text-sm"
                  onClick={() => navigate("/cart")}
                >
                  Back to Cart
                </button>
              </div>

              <div className="pt-6 text-[11px] text-gray-400 space-y-1 font-medium">
                <p>* Free shipping on orders over ৳299</p>
                <p>* 30-days return policy</p>
                <p>* Secure checkout with SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
