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
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col h-full overflow-hidden">
      
      <div className="w-full h-48 overflow-hidden bg-slate-50 cursor-pointer" onClick={()=>navigate(`/products/${product._id}`)}>
        <img
          src={product?.productImg?.[0]?.url}
          alt={product?.productName}
          className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col grow space-y-1.5">
        <h2 className="text-base font-bold text-slate-800 line-clamp-1 hover:text-blue-600 cursor-pointer" onClick={()=>navigate(`/products/${product._id}`)}>
          {product?.productName}
        </h2>

        <p className="text-xs text-slate-500 font-normal line-clamp-2 h-8">
          {product?.productDes}
        </p>

        <div className="text-lg font-black text-slate-900 flex items-center gap-0.5 mt-auto pt-1">
          <span className="text-xl text-blue-600">৳</span> {product?.productPrice?.toLocaleString("en-IN")}
        </div>

        <button
          className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 shadow-sm hover:shadow transition duration-200 active:scale-[0.98]"
          onClick={handleAddToCart}
          disabled={loader}
        >
          {loader ? (
            <FiLoader className="animate-spin" size={20} />
          ) : (
            <>
              <MdOutlineShoppingCart size={18} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;