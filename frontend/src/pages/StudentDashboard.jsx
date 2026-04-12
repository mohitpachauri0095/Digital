import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoticeCard from '../components/NoticeCard';
import ChatbotWidget from '../components/ChatbotWidget';
import Footer from '../components/Footer';
import Events from './Events';
import Contact from './Contact';
import { Search, Flame, Inbox, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentDashboard = () => {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Exam', 'Placement', 'Event', 'General'];

  useEffect(() => {
    fetchNotices();
    const interval = setInterval(fetchNotices, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterNotices();
  }, [notices, searchTerm, selectedCategory]);

  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notices');
      setNotices(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch notices", err);
      setLoading(false);
    }
  };

  const filterNotices = () => {
    let result = notices;
    if (selectedCategory !== 'All') {
      result = result.filter(n => n.category === selectedCategory);
    }
    if (searchTerm) {
      const lowerReq = searchTerm.toLowerCase();
      result = result.filter(n => 
        n.title.toLowerCase().includes(lowerReq) || 
        n.content.toLowerCase().includes(lowerReq) ||
        (n.aiSummary && n.aiSummary.toLowerCase().includes(lowerReq))
      );
    }
    setFilteredNotices(result);
  };

  const renderSkeleton = () => (
    <div className="space-y-8">
      {[1, 2, 3].map((n) => (
        <div key={n} className="bg-white/40 dark:bg-college-dark/40 rounded-3xl overflow-hidden animate-pulse border border-college-accent/20 h-64"></div>
      ))}
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto pb-24 px-4"
    >
      {/* Advanced Hero Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-college-primary to-[#051F20] p-10 md:p-16 mb-12 shadow-2xl border border-college-secondary text-center"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-college-secondary opacity-30 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-college-accent opacity-20 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-college-light/10 backdrop-blur-xl rounded-2xl mb-6 shadow-[0_0_40px_rgba(142,182,155,0.3)] border border-college-light/20 text-college-light"
          >
            <Sparkles size={36} />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-college-light to-white mb-6 tracking-tight leading-tight">
            Campus Pulse Hub
          </h1>
          <p className="text-college-accent max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            The intelligent center for your university updates. Powered by AI to keep you ahead.
          </p>
        </div>
      </motion.div>

      {/* Advanced Controls Glassmorphism Bar */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-5 mb-10 bg-white/70 dark:bg-college-primary/30 backdrop-blur-xl p-5 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-college-accent/30 sticky top-24 z-40"
      >
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search size={22} className="text-college-secondary group-focus-within:text-college-primary transition-colors duration-300" />
          </div>
          <input
            type="text"
            placeholder="Search intelligent notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white/50 dark:bg-college-dark/50 border border-college-accent/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-college-secondary dark:text-college-light transition-all text-[16px] font-medium shadow-inner placeholder-college-secondary/60"
          />
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide shrink-0 items-center">
          {categories.map((cat) => (
            <button
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-6 py-3.5 rounded-2xl text-[15px] font-bold tracking-wide transition-all whitespace-nowrap border-2 ${
                 selectedCategory === cat 
                   ? 'bg-college-primary text-college-light border-college-primary shadow-[0_0_20px_rgba(22,56,50,0.4)] transform scale-105' 
                   : 'bg-white/60 dark:bg-[#051F20]/60 text-college-primary dark:text-college-accent border-college-accent/20 hover:border-college-secondary hover:bg-college-light/50'
               }`}
             >
               {cat === 'All' ? <span className="flex items-center gap-2"><Flame size={16} /> Discover</span> : cat}
             </button>
          ))}
        </div>
      </motion.div>

      {/* Grid List Notice Cards */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 gap-8">
          {loading ? (
            renderSkeleton()
          ) : filteredNotices.length > 0 ? (
            filteredNotices.map((notice, i) => (
              <NoticeCard key={notice._id} notice={notice} isAdmin={false} index={i} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32 bg-white/50 dark:bg-college-primary/20 backdrop-blur-md rounded-[3rem] border border-college-accent/30"
            >
              <div className="mx-auto w-24 h-24 bg-college-light/80 dark:bg-college-dark/80 flex items-center justify-center rounded-full mb-8 shadow-xl">
                <Inbox size={40} className="text-college-primary dark:text-college-accent" />
              </div>
              <h3 className="text-3xl font-black text-college-primary dark:text-college-light mb-4">Void of Updates</h3>
              <p className="text-college-secondary dark:text-college-accent max-w-md mx-auto text-lg">
                Your crystal ball shows nothing for these exact filters. Feel free to explore other categories.
              </p>
              {(searchTerm || selectedCategory !== 'All') && (
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="mt-8 px-8 py-3 bg-college-primary text-college-light font-bold rounded-xl hover:shadow-[0_0_30px_rgba(22,56,50,0.4)] transition-all transform hover:-translate-y-1"
                >
                  Reset Dimensional Filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </AnimatePresence>

      <div className="mt-20">
        <Events />
      </div>
      
      <div className="mt-10">
        <Contact />
      </div>

      <div className="mt-10">
        <Footer />
      </div>

      <ChatbotWidget />
    </motion.div>
  );
};

export default StudentDashboard;
