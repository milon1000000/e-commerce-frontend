import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import { userDataContext } from "../context/userContext";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
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

 

  return (
    <div className="pt-20 pb-10 bg-white min-h-screen">
      <Navbar/>

      <div className="max-w-360 mx-auto flex flex-col lg:flex-row gap-4 px-4 mt-6">
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

        <div className="flex-1">
          {loading ? (
            <p className="flex justify-center mt-10">
              <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
            </p>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
