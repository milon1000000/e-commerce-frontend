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

  if (!product) return <p className="p-10">Loading...</p>;

  return (
    <div className="pt-16 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex flex-1 justify-center items-start p-6">
          <form
            onSubmit={handleUpdate}
            className="space-y-4 w-full max-w-lg bg-white p-6 rounded shadow"
          >
            <h1 className="text-2xl font-bold mb-4 text-center">Update Product</h1>

            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border p-2 rounded"
            />

            <textarea
              name="productDes"
              value={formData.productDes}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
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
                {previewImages.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
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
      />
    </div>
  );
}

export default AdminUpdateProduct;