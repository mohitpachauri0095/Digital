import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Link as LinkIcon, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const socialLinks = [
    { icon: <Globe size={20} />, href: '#' },
    { icon: <Share2 size={20} />, href: '#' },
    { icon: <LinkIcon size={20} />, href: '#' },
    { icon: <Mail size={20} />, href: '#' },
  ];

  return (
    <footer className="relative mt-20 pt-16 pb-8 overflow-hidden rounded-t-3xl">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-college-dark via-slate-800 to-indigo-900 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500"></div>

      {/* Floating Blobs for background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Tech College
            </h2>
            <p className="text-slate-300 leading-relaxed max-w-sm">
              Empowering the next generation of innovators and leaders with cutting-edge education and modern digital experiences.
            </p>
            <div className="flex items-center gap-2 text-slate-300 pt-2">
              <Mail size={16} className="text-blue-400" />
              <span>Deepak.kumar_</span>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Upcoming Events', path: '/events' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Admin Login', path: '/admin-login' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a 
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5, backgroundColor: "#3b82f6" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-white border border-slate-700/50 backdrop-blur-sm transition-colors shadow-lg"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-8 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-md">
              <p className="text-sm text-slate-300">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="bg-slate-900/50 text-white text-sm rounded-l-lg px-3 py-2 w-full outline-none focus:ring-1 focus:ring-blue-500 border border-slate-700"
                />
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-r-lg transition-colors text-sm font-medium">
                  Join
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div 
          variants={itemVariants} 
          className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400"
        >
          <p>&copy; {new Date().getFullYear()} Tech College. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
