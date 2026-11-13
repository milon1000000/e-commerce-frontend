import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import { userDataContext } from "../context/userContext";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import Pagination from "../components/ui/Pagination";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Product() {
  const { productData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [allProducts, setAllProducts] = useState(productData || []);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 999999]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, priceRange, searchProduct]);

  useEffect(() => {
    if (productData) {
      setAllProducts(productData);
    }
  }, [productData]);

  useEffect(() => {
    if (!searchProduct) {
      setSearchData([]);
      setAllProducts(productData || []);
      return;
    }

    const fetchSearch = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${serverUrl}/api/v1/product/search-product`,
          {
            params: { search: searchProduct },
            withCredentials: true,
          },
        );

        setSearchData(res.data.products || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [searchProduct, productData]);

  const displayProducts = searchProduct ? searchData : allProducts;

  const filteredProducts = displayProducts.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    const brandMatch =
      selectedBrand === "All" || product.brand === selectedBrand;

    const priceMatch =
      product.productPrice >= priceRange[0] &&
      product.productPrice <= priceRange[1];

    return categoryMatch && brandMatch && priceMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="pt-20 pb-12 bg-slate-50/50 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6 px-4 mt-6 flex-1">
        <FilterSidebar
          allProducts={allProducts}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          searchProduct={searchProduct}
          setSearchProduct={setSearchProduct}
        />

        <div className="flex-1 flex flex-col">
          {loading ? (
            <div className="flex justify-center items-center py-20 flex-1">
              <AiOutlineLoading3Quarters className="animate-spin text-3xl text-blue-600" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="flex flex-col flex-1 justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <div key={product._id} className="flex justify-center">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 border-t border-slate-200/80 pt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredProducts.length}
                  itemsPerPage={itemsPerPage}
                  itemName="products"
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-500 shadow-xs flex-1 flex flex-col items-center justify-center">
              <p className="text-lg font-medium text-slate-700">No products found</p>
              <p className="text-sm text-slate-400 mt-1">Try adjusting your filters or search keyword</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
