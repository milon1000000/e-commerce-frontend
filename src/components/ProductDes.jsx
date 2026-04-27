import React, { useState, useContext } from "react";
import { userDataContext } from "../context/userContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";

function ProductDes({ product }) {
  const { setAddToCartData, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToCartProduct = async (productId) => {
    try {
      setLoader(true);

      const result = await axios.post(
        `${serverUrl}/api/v1/cart/add`,
        { productId, quantity },
        { withCredentials: true }
      );

      if (result.data.success) {
        toast.success(result.data.message);
        setAddToCartData({ ...result.data.cart });

        setTimeout(() => navigate("/cart"), 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  const handleAddToCart = () => {
    if (!userData) {
      toast.error("Please login first");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }
    addToCartProduct(product._id);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800">
        {product.productName}
      </h1>

      <p className="text-gray-500 text-sm md:text-base">
        {product.category} | {product.brand}
      </p>

      <h2 className="text-pink-500 font-bold text-xl md:text-2xl">
        ৳ {product.productPrice}
      </h2>

      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
        {product.productDes}
      </p>

      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-700">Qty:</span>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 h-10 text-center border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
        />
      </div>

      <button
        className="w-full md:w-fit px-6 h-11 flex items-center justify-center gap-2 bg-pink-500 text-white font-semibold rounded-xl shadow-md hover:bg-pink-600 hover:shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-60"
        onClick={handleAddToCart}
        disabled={loader}
      >
        {loader ? <FiLoader className="animate-spin" size={20} /> : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductDes;