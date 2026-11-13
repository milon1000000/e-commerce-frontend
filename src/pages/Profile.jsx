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
      <div className="min-h-screen bg-slate-50 flex justify-center items-start pt-28 pb-12 px-4">
        <div className="w-full max-w-3xl bg-white shadow-xl border border-slate-200/80 rounded-2xl p-8">
          <h2 className="text-2xl font-extrabold mb-6 text-center text-slate-800 tracking-tight">
            Account Profile
          </h2>

          {/* Profile Image */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div
              className="w-full h-full rounded-full overflow-hidden border-2 border-slate-200 shadow-md cursor-pointer ring-2 ring-blue-500/20"
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
              className="absolute bottom-0 right-0 w-6 h-6 text-blue-600 bg-white rounded-full p-0.5 shadow-md cursor-pointer hover:scale-110 transition"
              onClick={() => profileImage.current.click()}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            {[
              "firstName",
              "lastName",
              "phone",
              "city",
              "address",
              "zipCode",
            ].map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "phone" ? "text" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            ))}

            <div className="md:col-span-2 text-center mt-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-white shadow-sm hover:shadow transition-all ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
                } flex justify-center items-center gap-2`}
              >
                {loading && <RiLoader2Fill className="animate-spin" />}
                {loading ? "Updating..." : "Save Profile Changes"}
              </button>
            </div>
          </form>

          <div className="md:col-span-2 text-center mt-3">
            <button
              className="w-full py-3 rounded-xl font-bold text-blue-600 bg-blue-50/50 hover:bg-blue-100/60 border border-blue-200 transition-all duration-200 shadow-xs flex justify-center items-center gap-2"
              onClick={() => navigate("/order")}
            >
              View Order History
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
