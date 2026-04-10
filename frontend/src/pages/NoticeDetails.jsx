import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileDown, User, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

const NoticeDetails = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notices/${id}`);
        setNotice(res.data);
      } catch (err) {
        console.error("Failed to fetch notice", err);
        toast.error("Notice not found!");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Exam': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800/50';
      case 'Placement': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/50';
      case 'Event': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800/50';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
         <div className="inline-block w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
         <p className="mt-4 text-slate-500 dark:text-slate-400">Loading Notice...</p>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Notice Not Found</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 fade-in">
      <div className="mb-6 flex items-center">
        <Link to="/" className="text-slate-500 hover:text-college-primary transition-colors flex items-center gap-2 font-medium">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>

      <article className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        
        {/* Header Section */}
        <header className="p-8 md:p-10 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getCategoryColor(notice.category)} flex items-center gap-1`}>
              <Tag size={16} /> {notice.category}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
              <Calendar size={16} /> {formatDate(notice.createdAt)}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white leading-tight mb-4">
            {notice.title}
          </h1>
          
          <div className="flex items-center gap-3 mt-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-gray-200">University Admin</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Official Notice</p>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="p-8 md:p-10">
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {notice.content}
          </div>

          {/* AI Summary Block */}
          {notice.aiSummary && notice.aiSummary !== "No summary available." && (
            <div className="mt-10 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-wider mb-3 flex items-center">
                <span className="mr-2 text-xl">✨</span> AI Summary
              </h4>
              <p className="text-indigo-900 dark:text-indigo-200/90 font-medium leading-relaxed">
                {notice.aiSummary}
              </p>
            </div>
          )}
        </div>

        {/* Footer/Actions Section */}
        {notice.fileUrl && (
          <div className="px-8 py-6 md:px-10 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-700">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Attachments</h4>
            <a 
              href={`http://localhost:5000${notice.fileUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-700 py-3 px-6 rounded-xl border border-slate-200 dark:border-slate-600 text-blue-600 dark:text-blue-400 font-semibold hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-all duration-300"
            >
              <FileDown size={20} /> Download Attached File
            </a>
          </div>
        )}
      </article>
      
    </div>
  );
};

export default NoticeDetails;
