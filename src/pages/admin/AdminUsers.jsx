import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/ui/Pagination";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    if (!allUsers || allUsers.length === 0) {
      getAllUsers();
    }
  }, [allUsers, getAllUsers]);

  useEffect(() => {
    setCurrentPage(1);
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

  const totalUsers = filteredUsers || [];
  const totalPages = Math.ceil(totalUsers.length / itemsPerPage);
  const paginatedUsers = totalUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="md:ml-64 pt-16 p-4 md:p-8">

        {/* Header */}
        <div className="mb-6 pt-14">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500 text-sm md:text-base">View and manage registered users</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative w-full md:w-72">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Users..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-sm"
            />
          </div>
        </div>

        {/* User Cards */}
        {loading ? (
          <p className="text-slate-500 text-sm">Searching users...</p>
        ) : paginatedUsers && paginatedUsers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {paginatedUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-4 md:p-6 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex items-start gap-4"
                >
                  {/* Avatar */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-blue-100 ring-2 ring-blue-50 shrink-0">
                    <img
                      src={user.profileImage?.url || "/profile.jpg"}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-3 min-w-0 flex-1">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base md:text-lg truncate">
                        {`${user.firstName} ${user.lastName}`}
                      </h3>
                      <p className="text-slate-500 text-xs md:text-sm truncate">{user.email}</p>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs md:text-sm hover:bg-blue-700 shadow-xs transition-all font-medium" onClick={()=>navigate(`/dashboard/single-user/${user._id}`)}>
                        <FaEdit size={11} /> Edit
                      </button>
                      <button className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs md:text-sm transition-all font-medium" onClick={()=>navigate(`/dashboard/user/orders/${user._id}`)}>
                        <FaEye size={11} /> Orders
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalUsers.length > itemsPerPage && (
              <div className="mt-8 bg-white rounded-2xl border border-slate-200/80 p-2 shadow-xs">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalUsers.length}
                  itemsPerPage={itemsPerPage}
                  itemName="users"
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <p className="text-slate-400 italic text-sm">No users found...</p>
        )}
      </main>
    </div>
  );
}

export default AdminUsers;