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
    <div className="bg-white border border-slate-200/80 shadow-xs p-5 rounded-2xl h-max hidden md:block w-72">

      <div className="w-full mb-2">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-slate-300 rounded-xl px-4 py-2.5 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          value={searchProduct}
          onChange={handleChange}
        />
      </div>
      <h1 className="mt-5 font-bold text-lg text-slate-800">Category</h1>

      <div className="flex flex-col gap-2 mt-3">
        {UniqueCategory.map((item, index) => (
          <div key={index} className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-blue-600 cursor-pointer">
            <input
              type="radio"
              name="category"
              className="accent-blue-600 w-4 h-4 cursor-pointer"
              checked={selectedCategory === item}
              onChange={() => setSelectedCategory(item)}
            />
            <label className="cursor-pointer">{item}</label>
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
        className="bg-blue-600 w-full p-2.5 rounded-xl hover:bg-blue-700 text-white font-semibold shadow-sm transition duration-200 mt-5"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterSidebar;
