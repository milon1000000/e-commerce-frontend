import React, { useContext, useRef, useState, useEffect } from "react";
import { userDataContext } from "../context/userContext";
import Navbar from "../components/ui/Navbar";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import { RiLoader2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { userData, setUserData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const profileImage = useRef();
  const [frontendProfileImage, setFrontendProfileImage] =
    useState("/profile.png");
  const [backendProfileImage, setBackendProfileImage] = useState(null);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        city: userData.city || "",
        zipCode: userData.zipCode || "",
      });
      setFrontendProfileImage(userData.profileImage?.url || "/profile.jpg");
    }
  }, [userData]);

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBackendProfileImage(file);
    setFrontendProfileImage(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (backendProfileImage) data.append("profileImage", backendProfileImage);

      const result = await axios.put(
        `${serverUrl}/api/v1/user/update-user`,
        data,
        {
          withCredentials: true,
          headers: { user_id: userData._id },
        },
      );

      if (result.data.success) {
        setUserData(result.data.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-pink-50 to-purple-50 flex justify-center items-start pt-28 pb-10 px-4">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
            Update Profile
          </h2>

          {/* Profile Image */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div
              className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow cursor-pointer"
              onClick={() => profileImage.current.click()}
            >
              <img
                src={frontendProfileImage}
                alt="profile"
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                ref={profileImage}
                onChange={handleProfileImage}
                className="hidden"
              />
            </div>

            <FaPlusCircle
              className="absolute bottom-0 right-0 w-6 h-6 text-pink-500 bg-white rounded-full p-0.5 shadow-md cursor-pointer"
              onClick={() => profileImage.current.click()}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            {[
              "firstName",
              "lastName",
              "phone",
              "city",
              "address",
              "zipCode",
            ].map((field) => (
              <div key={field}>
                <label className="font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "phone" ? "text" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            ))}

            <div className="md:col-span-2 text-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-medium text-white ${
                  loading
                    ? "bg-pink-400 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700"
                } flex justify-center items-center gap-2`}
              >
                {loading && <RiLoader2Fill className="animate-spin" />}
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
           <div className="md:col-span-2 text-center mt-4">
              <button className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg flex justify-center items-center gap-2" onClick={()=>navigate("/order")}>
                This is my order
              </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
