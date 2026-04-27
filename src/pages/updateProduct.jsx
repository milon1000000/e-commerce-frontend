import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/Sidebar";
import { authDataContext } from "../../context/authContext";
import { userDataContext } from "../../context/userContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { RiLoader2Fill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const { serverUrl, userData } = useContext(authDataContext); // auth context theke nite hobe
  const { productData, setProductData } = useContext(userDataContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const product = productData?.find((p) => p._id === id);

  const [formData, setFormData] = useState({
    productName: "",
    productDes: "",
    productPrice: "",
    category: "",
    brand: "",
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // load existing product data
  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName,
        productDes: product.productDes,
        productPrice: product.productPrice,
        category: product.category,
        brand: product.brand,
      });

      // existing images
      if (product.productImg && product.productImg.length > 0) {
        setPreviewImages(product.productImg.map((img) => img.url));
      }
    }
  }, [product]);

  // input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    let files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      files = files.slice(0, 5 - images.length);
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData?._id) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((img) => data.append("productImg", img));

      const res = await axios.put(
        `${serverUrl}/api/v1/product/update-product/${id}`,
        data,
        {
          withCredentials: true,
          headers: {
            user_id: userData._id,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Product updated successfully!", {
          autoClose: 1500,
        });

        // update UI
        setProductData((prev) =>
          prev.map((p) => (p._id === id ? res.data.data : p))
        );

        setTimeout(() => navigate("/dashboard/products"), 1500);
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p className="p-10">Loading...</p>;

  return (
    <div className="pt-16 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex flex-1 justify-center items-start p-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full max-w-lg bg-white p-6 rounded shadow"
          >
            <h1 className="text-2xl font-bold mb-4 text-center">
              Update Product
            </h1>

            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <textarea
              name="productDes"
              placeholder="Description"
              value={formData.productDes}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              name="productPrice"
              placeholder="Price"
              value={formData.productPrice}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <div>
              <label className="block mb-2 font-semibold">
                Upload Images (Max 5)
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {previewImages.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {previewImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-pink-600 text-white px-4 py-2 rounded w-full flex items-center justify-center"
            >
              {loading ? <RiLoader2Fill className="animate-spin" /> : "Update Product"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position={window.innerWidth < 640 ? "top-center" : "top-right"}
        autoClose={3000}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default UpdateProduct;