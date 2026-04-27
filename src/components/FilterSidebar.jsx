import React from "react";

function FilterSidebar({
  allProducts,
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  searchProduct,
  setSearchProduct
}) {
  const Categories = allProducts.map((p) => p.category);
  const UniqueCategory = ["All", ...new Set(Categories)];

  const Brand = allProducts.map((p) => p.brand);
  const UniqueBrand = ["All", ...new Set(Brand)];
  
 const handleChange = (e) => {
    setSearchProduct(e.target.value);
  };
  return (
    <div className="bg-gray-100 p-4 rounded-md h-max hidden md:block w-64">

      <div className="flex justify-end max-w-360 mx-auto px-4 mt-4">
              <input
                type="text"
                placeholder="Search products..."
                className="border border-black rounded-lg px-4 py-2 w-full sm:w-64 md:w-80"
                value={searchProduct}
                onChange={handleChange}
              />
            </div>
      <h1 className="mt-5 font-semibold text-xl">Category</h1>

      <div className="flex flex-col gap-2 mt-3">
        {UniqueCategory.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === item}
              onChange={() => setSelectedCategory(item)}
            />
            <label>{item}</label>
          </div>
        ))}
      </div>

      <h1 className="mt-5 font-semibold text-xl">Brand</h1>

      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
      >
        {UniqueBrand.map((item, index) => (
          <option key={index} value={item}>
            {item?.toUpperCase()}
          </option>
        ))}
      </select>

      <h1 className="mt-5 font-semibold text-xl">Price Range</h1>

      <label>
        Price Range: <span className="text-xl">৳</span> {priceRange[0]} -
        <span className="text-xl">৳</span> {priceRange[1]}
      </label>

      <div className="mt-3">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            min="0"
            max="5000"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-20 p-1 border border-gray-300 rounded"
          />

          <span>-</span>

          <input
            type="number"
            min="0"
            max="999999"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-20 p-1 border border-gray-300 rounded"
          />
        </div>

        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={priceRange[0]}
          onChange={(e) =>
            setPriceRange([Number(e.target.value), priceRange[1]])
          }
          className="w-full"
        />

        <input
          type="range"
          min="0"
          max="999999"
          step="100"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="w-full"
        />
      </div>

      <button
        onClick={() => {
          setSelectedCategory("All");
          setSelectedBrand("All");
          setPriceRange([0, 999999]);
        }}
        className="bg-pink-500 w-full p-2 rounded-lg hover:bg-pink-600 duration-500 mt-4"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterSidebar;
