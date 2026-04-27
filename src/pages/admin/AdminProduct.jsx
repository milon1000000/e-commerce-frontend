import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/Sidebar";
import { userDataContext } from "../../context/userContext";
import { RiLoader2Fill, RiEditBoxLine, RiDeleteBin6Line, RiSearchLine } from "react-icons/ri";
import { authDataContext } from "../../context/authContext";
import axios from "axios";

function AdminProduct() {
  const { productData, setProductData, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();

  const deleteProduct = async ({ productId }) => {
    setLoadingProductId(productId);
    try {
      await axios.delete(`${serverUrl}/api/v1/product/delete-product/${productId}`, {
        withCredentials: true,
        headers: { user_id: userData._id },
      });
      setProductData((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      console.log("Delete error:", error.response?.data || error.message);
    }
    setLoadingProductId(null);
  };

  useEffect(() => {
    if (!searchProduct) {
      setSearchData([]);
      return;
    }
    const fetchSearch = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/v1/product/search-product`, {
          params: { search: searchProduct },
          withCredentials: true,
        });
        setSearchData(res.data.products || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSearch();
  }, [searchProduct, serverUrl]);

  const displayProducts = searchProduct ? searchData : productData;

  return (
    <div className="min-h-screen bg-[#FDF8FA]">
      <Navbar setIsOpen={setIsOpen} />

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="md:ml-64 pt-22 p-4 md:p-6 min-h-screen">
        <div className="max-w-6xl mx-auto">

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search Product..."
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all text-gray-600"
              />
            </div>
          </div>

          {/* Product List */}
          <div className="space-y-4">
            {displayProducts && displayProducts.length > 0 ? (
              displayProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl border border-gray-50 p-3 md:p-4 flex items-center gap-3 md:gap-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Image */}
                  <div
                    className="w-20 h-20 md:w-28 md:h-28 shrink-0 bg-gray-50 rounded-xl p-2 flex items-center justify-center cursor-pointer"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <img
                      src={product.productImg?.[0]?.url}
                      alt={product.productName}
                      className="max-w-full max-h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {loadingProductId === product._id ? (
                    <div className="flex-1 py-10 flex justify-center items-center">
                      <RiLoader2Fill className="animate-spin text-3xl text-pink-500" />
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-gray-800 text-sm md:text-lg leading-snug line-clamp-2">
                          {product.productName}
                        </h2>
                      </div>

                      <div className="text-base md:text-xl font-bold text-gray-700 text-right shrink-0">
                        <span className="text-lg md:text-2xl">৳</span>
                        {product.productPrice}
                      </div>

                      <div className="flex flex-col md:flex-row gap-1 md:gap-2 shrink-0">
                        <Link
                          to={`/dashboard/update-product/${product._id}`}
                          className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors flex items-center justify-center"
                        >
                          <RiEditBoxLine size={20} />
                        </Link>
                        <button
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
                          onClick={() => deleteProduct({ productId: product._id })}
                        >
                          <RiDeleteBin6Line size={20} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-dashed">
                No products found.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminProduct;