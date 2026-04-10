import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import NoticeCard from '../components/NoticeCard';
import { PlusCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { admin, logout } = useContext(AuthContext);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notices');
      setNotices(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch notices", err);
      toast.error("Failed to load notices");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/notices/${id}`, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      toast.success("Notice deleted successfully");
      fetchNotices(); // Refresh list
    } catch (err) {
      console.error("Failed to delete notice", err);
      toast.error("Error deleting notice");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 fade-in">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8 mt-4 flex flex-col md:flex-row gap-4 justify-between items-center transition-colors">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Admin Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage platform notices and announcements</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Link 
            to="/admin/add-notice"
            className="flex-1 md:flex-none justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <PlusCircle size={20}/> New Notice
          </Link>
          <button 
            onClick={logout}
            className="flex-1 md:flex-none justify-center bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-colors border border-slate-200 dark:border-slate-600"
          >
            <LogOut size={20}/> Logout
          </button>
        </div>
      </div>

      {/* Notices List */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Recent Notices</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded-full text-xs font-bold">
            {notices.length} Total
          </span>
        </div>
        
        {loading ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="inline-block w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium">Loading Notices...</p>
          </div>
        ) : notices.length > 0 ? (
          <div className="space-y-4">
            {notices.map(notice => (
              <NoticeCard 
                key={notice._id} 
                notice={notice} 
                isAdmin={true} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 border-dashed">
            <p className="text-slate-500 dark:text-slate-400 mb-4">No notices posted yet.</p>
            <Link to="/admin/add-notice" className="text-blue-600 font-medium hover:underline">
              Create your first notice
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;

