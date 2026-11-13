import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/Sidebar";
import { userDataContext } from "../context/userContext";
import { authDataContext } from "../context/authContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiLoader2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminUpdateProduct() {
  const { productData, setProductData, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const product = productData?.find((p) => p._id === id);

  const [formData, setFormData] = useState({
    productName: "",
    productDes: "",
    productPrice: "",
    category: "",
    brand: "",
  });

  // **Images**
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]); 
  const [previewImages, setPreviewImages] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName,
        productDes: product.productDes,
        productPrice: product.productPrice,
        category: product.category,
        brand: product.brand,
      });

      if (product.productImg?.length > 0) {
        setExistingImages(product.productImg); 
        setPreviewImages(product.productImg.map((img) => img.url));
      }
    }
  }, [product]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add new images
  const handleFileChange = (e) => {
    let files = Array.from(e.target.files);

    if (existingImages.length + newImages.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      files = files.slice(0, 5 - existingImages.length - newImages.length);
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setNewImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  // Remove image (can remove existing or new)
  const handleRemoveImage = (index) => {
    if (index < existingImages.length) {
      // remove from existing images
      const updatedExisting = [...existingImages];
      updatedExisting.splice(index, 1);
      setExistingImages(updatedExisting);
    } else {
      // remove from new images
      const newIndex = index - existingImages.length;
      const updatedNew = [...newImages];
      updatedNew.splice(newIndex, 1);
      setNewImages(updatedNew);
    }

    const updatedPreview = [...previewImages];
    updatedPreview.splice(index, 1);
    setPreviewImages(updatedPreview);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!userData?._id) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      newImages.forEach((img) => data.append("productImg", img));

      existingImages.forEach((img) => data.append("existingImages", img._id));

      const res = await axios.put(
        `${serverUrl}/api/v1/product/update-product/${id}`,
        data,
        {
          withCredentials: true,
          headers: { user_id: userData._id },
        }
      );

      if (res.data.success) {
        setProductData((prev) =>
          prev.map((p) => (p._id === id ? res.data.data : p))
        );
        toast.success("Product updated successfully!");
        setTimeout(() => navigate("/dashboard/products"), 1200);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar setIsOpen={setIsOpen} isSidebarOpen={isOpen} />
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="md:ml-64 pt-24 p-6">
          <p className="text-slate-400 italic">Product not found or loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar setIsOpen={setIsOpen} isSidebarOpen={isOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="md:ml-64 pt-24 pb-12 px-4 flex justify-center items-start">
        <form
          onSubmit={handleUpdate}
          className="w-full max-w-2xl bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-5"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              Update <span className="text-blue-600">Product</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Modify product details, pricing, and images
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="e.g. Wireless Noise-Cancelling Headphones"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              name="productDes"
              rows={3}
              value={formData.productDes}
              onChange={handleChange}
              placeholder="Detailed product description..."
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Price ($)
              </label>
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                placeholder="99.99"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Electronics"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Sony"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Product Images (Max 5 total)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 bg-slate-50/50 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          {previewImages.length > 0 && (
            <div className="flex gap-3 flex-wrap pt-2">
              {previewImages.map((img, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <img
                    src={img}
                    alt="preview"
                    className="w-20 h-20 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow hover:bg-red-700 transition-all"
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
            className="w-full py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <RiLoader2Fill className="animate-spin text-xl" /> : "Update Product"}
          </button>
        </form>
      </main>

      <ToastContainer
        position={typeof window !== 'undefined' && window.innerWidth < 640 ? "top-center" : "top-right"}
      />
    </div>
  );
}

export default AdminUpdateProduct;