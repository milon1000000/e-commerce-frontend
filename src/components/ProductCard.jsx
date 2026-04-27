import React, { useContext, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from "../context/userContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { setAddToCartData, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const addToCartProduct = async (productId) => {
    try {
      setLoader(true);

      const result = await axios.post(
        `${serverUrl}/api/v1/cart/add`,
        { productId },
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

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return;
    }

    addToCartProduct(product._id);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden w-full hover:scale-105 transition duration-300 flex flex-col h-full">
      
      <div className="w-full h-48 overflow-hidden" onClick={()=>navigate(`/products/${product._id}`)}>
        <img
          src={product?.productImg?.[0]?.url}
          alt={product?.productName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col grow space-y-1">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product?.productName}
        </h2>

        <p className="text-sm text-gray-600 font-medium line-clamp-2 h-10">
          {product?.productDes}
        </p>

        <div className="text-xl font-bold text-green-600 flex items-center gap-1 mt-auto">
          <span className="text-2xl">৳</span> {product?.productPrice}
        </div>

        <button
          className="w-full mt-1 flex items-center justify-center gap-2 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300"
          onClick={handleAddToCart}
          disabled={loader}
        >
          {loader ? (
            <FiLoader className="animate-spin" size={20} />
          ) : (
            <>
              <MdOutlineShoppingCart size={20} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;