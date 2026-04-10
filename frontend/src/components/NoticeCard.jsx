import React from 'react';
import { Calendar, FileDown, Trash2, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NoticeCard = ({ notice, isAdmin, onDelete, index = 0 }) => {
  const getCategoryTheme = (category) => {
    switch (category) {
      case 'Exam': return { bg: 'bg-[#163832]', text: 'text-[#DAF1DE]', border: 'border-[#235347]/40' };
      case 'Placement': return { bg: 'bg-[#235347]', text: 'text-[#051F20]', border: 'border-[#163832]/40' };
      case 'Event': return { bg: 'bg-[#8EB69B]', text: 'text-[#051F20]', border: 'border-[#163832]/30' };
      default: return { bg: 'bg-[#DAF1DE]/20 dark:bg-[#163832]/30', text: 'text-[#163832] dark:text-[#8EB69B]', border: 'border-[#8EB69B]/50' };
    }
  };

  const theme = getCategoryTheme(notice.category);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className={`relative group bg-white/60 dark:bg-[#051F20]/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border ${theme.border} overflow-hidden mb-6 flex flex-col hover:shadow-2xl transition-all duration-500`}
    >
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8EB69B]/10 to-[#163832]/5 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700"></div>

      <Link to={`/notice/${notice._id}`} className="block p-8 flex-grow flex flex-col z-10">
        <div className="flex justify-between items-start mb-5 gap-4 relative">
          <h3 className="text-2xl font-black text-college-dark dark:text-college-light leading-tight group-hover:text-college-secondary transition-colors line-clamp-2">
            {notice.title}
          </h3>
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm ${theme.bg} ${theme.text}`}>
            {notice.category}
          </span>
        </div>
        
        <p className="text-[#163832]/80 dark:text-[#DAF1DE]/70 mb-6 line-clamp-3 flex-grow font-medium text-[15px] leading-relaxed">
          {notice.content}
        </p>
        
        {notice.aiSummary && notice.aiSummary !== "No summary available." && (
          <motion.div 
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.02 }}
            className="bg-gradient-to-r from-[#163832] to-[#235347] rounded-2xl p-5 mt-auto relative overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-xl rounded-full transform translate-x-10 -translate-y-10"></div>
            <h4 className="text-xs font-bold text-[#DAF1DE] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Zap size={14} className="text-[#8EB69B]" /> AI Insight
            </h4>
            <p className="text-sm text-white/90 line-clamp-2 font-medium leading-relaxed">{notice.aiSummary}</p>
          </motion.div>
        )}
      </Link>

      <div className="px-8 py-5 border-t border-[#8EB69B]/20 flex justify-between items-center text-sm bg-black/5 dark:bg-white/5 z-10">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 font-semibold text-[#163832] dark:text-[#8EB69B]">
            <Calendar size={18} /> {formatDate(notice.createdAt)}
          </span>
          {notice.fileUrl && (
            <a 
              href={`http://localhost:5000${notice.fileUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-white bg-[#163832] hover:bg-[#235347] px-4 py-2 rounded-xl transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FileDown size={16} /> Download
            </a>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <Link to={`/notice/${notice._id}`} className="hidden md:flex items-center gap-2 font-bold text-[#235347] hover:text-[#163832] dark:hover:text-[#DAF1DE] transition-colors group-hover:translate-x-2 duration-300">
            Read More <ArrowRight size={16} />
          </Link>

          {isAdmin && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                onDelete(notice._id);
              }}
              className="text-red-500 hover:text-white hover:bg-red-500 p-2.5 rounded-xl transition-all flex items-center justify-center shadow-sm"
              title="Delete Notice"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NoticeCard;
