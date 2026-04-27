import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/Sidebar";
import { authDataContext } from "../../context/authContext";
import { userDataContext } from "../../context/userContext";
import { FaEdit, FaEye } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const { serverUrl } = useContext(authDataContext);
  const { allUsers, getAllUsers } = useContext(userDataContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const navigate=useNavigate();
  useEffect(() => {
    if (!allUsers || allUsers.length === 0) {
      getAllUsers();
    }
  }, [allUsers, getAllUsers]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(allUsers || []);
      return;
    }

    const fetchSearch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}/api/v1/user/userSearch`, {
          params: { search: searchQuery },
          withCredentials: true,
        });
        setFilteredUsers(res.data.users || []);
      } catch (error) {
        console.log("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [searchQuery, allUsers, serverUrl]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="md:ml-64 pt-16 p-4 md:p-8">

        {/* Header */}
        <div className="mb-6 pt-14">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 text-sm md:text-base">View and manage registered users</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative w-full md:w-72">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Users..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white text-sm"
            />
          </div>
        </div>

        {/* User Cards */}
        {loading ? (
          <p className="text-gray-500 text-sm">Searching users...</p>
        ) : filteredUsers && filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-pink-50 p-4 md:p-6 rounded-xl shadow-sm border border-pink-100 flex items-start gap-4"
              >
                {/* Avatar */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-pink-200 shrink-0">
                  <img
                    src={user.profileImage?.url || "/profile.jpg"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-3 min-w-0">
                  <div>
                    <h3 className="font-bold text-gray-800 text-base md:text-lg truncate">
                      {`${user.firstName} ${user.lastName}`}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm truncate">{user.email}</p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button className="bg-zinc-800 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs md:text-sm hover:bg-zinc-700 transition-all" onClick={()=>navigate(`/dashboard/single-user/${user._id}`)}>
                      <FaEdit size={11} /> Edit
                    </button>
                    <button className="bg-zinc-800 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs md:text-sm hover:bg-zinc-700 transition-all" onClick={()=>navigate(`/dashboard/user/orders/${user._id}`)}>
                      <FaEye size={11} /> Show Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic text-sm">No users found...</p>
        )}
      </main>
    </div>
  );
}

export default AdminUsers;