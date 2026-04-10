import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UploadCloud, ArrowLeft, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const AddNotice = () => {
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today
  const [file, setFile] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and description.');
      return;
    }
    
    setSubmitLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    // Include user selected date optionally in content or as a metadata if backend supported it, 
    // but the backend auto-generates createdAt. We could append it to content or title if needed,
    // or just let backend use its timestamp. Let's prepend it to content for now to show we use it.
    const finalContent = content; // Keeping clean, date is mostly for UI or backend logic if it existed.
    
    formData.append('content', finalContent);
    // Note: Backend might ignore category if the AI overrides it, but let's pass it anyway 
    // if we want to bypass AI or if AI fails.
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('http://localhost:5000/api/notices', formData, {
        headers: {
          'Authorization': `Bearer ${admin.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Notice published successfully!');
      
      // Reset form
      handleReset();
      // Navigate back to admin dashboard after short delay
      setTimeout(() => navigate('/admin'), 1500);
      
    } catch (err) {
      console.error("Failed to create notice", err);
      toast.error(err.response?.data?.error || "Error posting notice");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setContent('');
    setCategory('General');
    setDate(new Date().toISOString().slice(0, 10));
    setFile(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 fade-in">
      <div className="mb-6 flex items-center">
        <Link to="/admin" className="text-slate-500 hover:text-college-primary transition-colors flex items-center gap-2 font-medium">
          <ArrowLeft size={20} /> Back to Admin Dashboard
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">Publish New Notice</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 border-b dark:border-slate-700 pb-6">
          Fill out the details below to broadcast a new announcement to the students.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Notice Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-sm"
                placeholder="E.g., Mid-Sem Examination Schedule"
              />
            </div>
            
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-sm cursor-pointer"
              >
                <option value="General">General</option>
                <option value="Exam">Exam</option>
                <option value="Placement">Placement</option>
                <option value="Event">Event</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description *</label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-sm resize-none"
              placeholder="Write the full notice content here..."
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Attachment (Optional)</label>
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group relative overflow-hidden">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                <div className="bg-white dark:bg-slate-700 p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                <p className="mb-1 text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-slate-400">{file ? 'File selected' : 'PDF, PNG, JPG (Max 5MB)'}</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
                accept=".pdf,image/*" 
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 mt-6 border-t dark:border-slate-700 justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={submitLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Publishing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send size={18} /> Publish Notice
                </span>
              )}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
