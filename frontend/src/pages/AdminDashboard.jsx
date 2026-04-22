import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import NoticeCard from '../components/NoticeCard';
import { PlusCircle, LogOut, Globe, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { admin, logout } = useContext(AuthContext);
  const [notices, setNotices] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('notices');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [noticesRes, chatsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/notices'),
        axios.get('http://localhost:5000/api/chat/history')
      ]);
      setNotices(noticesRes.data);
      setChatHistory(chatsRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data", err);
      toast.error("Failed to load dashboard data");
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
      fetchData(); // Refresh list
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
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage platform notices and chat analytics</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Link 
            to="/"
            className="flex-1 md:flex-none justify-center bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <Globe size={20}/> View Website
          </Link>
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

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-700 pb-0">
        <button 
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-3 font-semibold transition-colors ${activeTab === 'notices' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
        >
          Notices
        </button>
        <button 
          onClick={() => setActiveTab('chats')}
          className={`px-4 py-3 font-semibold flex items-center gap-2 transition-colors ${activeTab === 'chats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
        >
          <MessageSquare size={16} /> AI Chat History
        </button>
      </div>

      {/* Notices Content */}
      {activeTab === 'notices' && (
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
      )}

      {/* Chat History Content */}
      {activeTab === 'chats' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">AI Assistant Logs</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 rounded-full text-xs font-bold">
              {chatHistory.length} Messages
            </span>
          </div>

          {loading ? (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="inline-block w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-green-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium">Loading Chat History...</p>
            </div>
          ) : chatHistory.length > 0 ? (
            <div className="space-y-4">
              {chatHistory.map(chat => (
                <div key={chat._id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-semibold">
                      🧑‍🎓 {chat.studentType} Student
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {new Date(chat.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30 mb-3">
                    <div className="text-xs font-bold text-blue-800 dark:text-blue-400 mb-1">User Query</div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">{chat.userMessage}</p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">AI Response</div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm italic">{chat.aiReply}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 border-dashed">
              <MessageSquare size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 mb-2">No AI chat history found.</p>
              <p className="text-sm text-slate-400 dark:text-slate-500">Students haven't asked the assistant any questions yet.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
