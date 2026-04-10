import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Footer from '../components/Footer';

const Events = () => {
  // Sample events data
  const eventsList = [
    {
      id: 1,
      title: "Annual Tech Symposium 2026",
      date: "Oct 15, 2026",
      time: "09:00 AM - 05:00 PM",
      location: "Main Auditorium",
      description: "Join industry leaders for an immersive experience exploring the latest in AI, Web3, and Quantum Computing.",
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      id: 2,
      title: "Hackathon: Build the Future",
      date: "Nov 02-04, 2026",
      time: "48 Hours",
      location: "Innovation Hub",
      description: "A 48-hour continuous coding challenge focused on sustainable tech solutions. Exciting prizes to be won!",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      id: 3,
      title: "Alumni Meet & Greet",
      date: "Dec 10, 2026",
      time: "06:00 PM - 09:00 PM",
      location: "College Campus Grounds",
      description: "Connect with successful alumni, expand your network, and enjoy an evening of food, music, and inspiring talks.",
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/30"
    },
    {
      id: 4,
      title: "Startup Pitch Deck Workshop",
      date: "Jan 18, 2027",
      time: "02:00 PM - 04:30 PM",
      location: "Seminar Room B",
      description: "Learn how to pitch your ideas effectively to angel investors from seasoned entrepreneurs.",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30"
    },
    {
      id: 5,
      title: "Virtual Reality Showcase",
      date: "Feb 05, 2027",
      time: "10:00 AM - 03:00 PM",
      location: "VR Lab, CS Department",
      description: "Experience the latest student-developed VR applications across various domains like healthcare and gaming.",
      color: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30"
    }
  ];

  // Duplicate the list for seamless infinite marquee scrolling
  const marqueeEvents = [...eventsList, ...eventsList];

  return (
    <div className="min-h-screen relative overflow-hidden pb-10">
      {/* Antigravity Floating Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob dark:opacity-30"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000 dark:opacity-30"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-4000 dark:opacity-30"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase">
            Campus Life
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-800 dark:text-white">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Events</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Discover and participate in incredible events, workshops, and milestones happening around our campus community.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden py-10">
          {/* Gradient masks for smooth fade out at edges */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900 z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900 z-10 pointer-events-none"></div>

          {/* The scrolling track */}
          <div className="flex w-[200%] animate-marquee hover:[animation-play-state:paused] gap-8 group">
            {marqueeEvents.map((evt, idx) => (
              <motion.div
                key={`${evt.id}-${idx}`}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`flex-shrink-0 w-80 md:w-96 p-6 rounded-2xl glass transition-all duration-300
                  bg-gradient-to-br ${evt.color} ${evt.borderColor} border backdrop-blur-xl shadow-xl
                  hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden`}
              >
                {/* Decorative glowing orb inside card */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex flex-col h-full relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">{evt.title}</h3>
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm font-medium">
                      <Calendar size={16} className="mr-3 text-blue-500" />
                      {evt.date}
                    </div>
                    <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm font-medium">
                      <Clock size={16} className="mr-3 text-blue-500" />
                      {evt.time}
                    </div>
                    <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm font-medium">
                      <MapPin size={16} className="mr-3 text-blue-500" />
                      {evt.location}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-700/50 pt-4">
                    {evt.description}
                  </p>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 dark:bg-white/10 text-white font-medium shadow-md hover:bg-black dark:hover:bg-white/20 transition-colors"
                  >
                    Register Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Events;
