import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/ui/Navbar';
import Sidebar from '../../components/Sidebar';
import { userDataContext } from '../../context/userContext';
import axios from 'axios';
import { RiLoader2Line } from "react-icons/ri";
import { authDataContext } from '../../context/authContext';

function AdminSingleUser() {
  const { id } = useParams();
  const { allUsers, getAllUsers } = useContext(userDataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const singleUser = allUsers?.find((user) => user._id === id);

  React.useEffect(() => {
    if (singleUser) {
      setRole(singleUser.role || 'user');
    }
  }, [singleUser]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  if (!singleUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar setIsOpen={setIsOpen} isSidebarOpen={isOpen} />
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="md:ml-64 pt-16 p-6">
          <p className="text-gray-400 italic">User not found.</p>
        </main>
      </div>
    );
  }

  const handleCreateAdmin = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${serverUrl}/api/v1/user/create-admin/${id}`,
        {},
        { withCredentials: true }
      );
      await getAllUsers();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const adminToCreateUser = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${serverUrl}/api/v1/user/create-user/${id}`,
        {},
        { withCredentials: true }
      );
      await getAllUsers();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = () => {
    if (role === 'admin') {
      handleCreateAdmin();
    } else {
      adminToCreateUser();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-purple-50">
      <Navbar setIsOpen={setIsOpen} isSidebarOpen={isOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

     

      <main className="md:ml-64 pt-24 pb-10 px-4 flex justify-center items-start">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
            User Profile
          </h2>

          {/* Profile Image */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-pink-200 shadow">
            <img
              src={singleUser.profileImage?.url || "/profile.jpg"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {[
              { label: "First Name", value: singleUser.firstName },
              { label: "Last Name", value: singleUser.lastName },
              { label: "Email", value: singleUser.email },
              { label: "Phone", value: singleUser.phone || "N/A" },
              { label: "City", value: singleUser.city || "N/A" },
              { label: "Address", value: singleUser.address || "N/A" },
              { label: "Zip Code", value: singleUser.zipCode || "N/A" },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="font-medium text-gray-700 text-sm">{label}</label>
                <div className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 bg-gray-50 text-gray-800 text-sm">
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Role Selector */}
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 mb-6">
            <p className="font-medium text-gray-700 text-sm mb-3">Change Role</p>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={handleRoleChange}
                  className="w-4 h-4 cursor-pointer accent-pink-600"
                />
                <span className="text-sm font-medium text-gray-700">User</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={handleRoleChange}
                  className="w-4 h-4 cursor-pointer accent-pink-600"
                />
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </label>
            </div>
          </div>

          {/* Update Role Button */}
          <button
            onClick={handleUpdateRole}
            disabled={loading}
            className="w-full py-3 rounded-lg font-medium text-white bg-pink-600 hover:bg-pink-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <RiLoader2Line className="animate-spin text-xl" /> : 'Update Role'}
          </button>

        </div>
      </main>
    </div>
  );
}

export default AdminSingleUser;