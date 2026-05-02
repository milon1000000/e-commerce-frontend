import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import Navbar from '../components/ui/Navbar';
import Sidebar from '../components/Sidebar';
import { useContext } from 'react';
import { authDataContext } from '../context/authContext';
import { userDataContext } from '../context/userContext';
import DashboardNav from '../components/ui/DashboardNav';

const Dashboard = () => {
  const{serverUrl}=useContext(authDataContext);
  const{userData}=useContext(userDataContext);
  const [data, setData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    sales: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/v1/order/salesData`, {withCredentials:true,headers:{user_id:userData._id}});

        if (response.data.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading Dashboard...</div>;
  }

  return (
    <div className='bg-gray-50 min-h-screen pt-20'>
      {/* <Navbar /> */}
      <DashboardNav/>
      <div className='flex'>
        <Sidebar className="pt-40"/>
        
        <main className='flex-1 p-4 md:p-8 pt-24 ml-0 md:ml-64 transition-all duration-300'>
          {/* Stats Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            <DashboardCard title="Total Users" value={data.totalUsers} icon="👥" />
            <DashboardCard title="Total Products" value={data.totalProducts} icon="📦" />
            <DashboardCard title="Total Orders" value={data.totalOrders} icon="🛒" />
            <DashboardCard title="Total Sales" value={formatCurrency(data.totalSales)} icon="💰" />
          </div>

          {/* Chart Section */}
          <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
            <div className='flex justify-between items-center mb-6'>
               <h3 className='text-lg font-bold text-gray-800'>Sales Analytics</h3>
               <span className='text-xs font-medium bg-pink-100 text-pink-600 px-3 py-1 rounded-full'>Last 30 Days</span>
            </div>
            
            <div className='h-87.5 w-full'>
              {data.sales.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.sales}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                        dataKey="date" 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(str) => str.split('-').slice(1).join('/')} 
                    />
                    <YAxis 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(val) => `৳${val}`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      formatter={(value) => [`৳${value}`, "Sales Amount"]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#ec4899" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorSales)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className='h-full flex items-center justify-center text-gray-400'>
                  No sales data available for the selected period.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Fixed Dashboard Card
const DashboardCard = ({ title, value, icon }) => (
  <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow'>
    <div>
        <p className='text-sm text-gray-500 font-medium mb-1'>{title}</p>
        <h2 className='text-2xl font-bold text-gray-800'>{value}</h2>
    </div>
    <div className='text-3xl bg-pink-50 w-12 h-12 flex items-center justify-center rounded-xl'>
        {icon}
    </div>
  </div>
);

export default Dashboard;