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
    <footer className="relative mt-20 pt-16 pb-8 overflow-hidden border-t border-college-accent/10">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b0c] to-college-dark z-0"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-college-accent via-college-light to-college-secondary"></div>

      {/* Floating Blobs for background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-college-secondary/40 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-college-primary/40 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-college-light to-college-accent pt-2">
              MVD University
            </h2>
            <p className="text-college-accent/80 leading-relaxed max-w-sm mt-4 font-medium">
              Empowering the next generation of innovators and leaders with cutting-edge education and modern digital experiences.
            </p>
            <div className="flex items-center gap-3 text-college-light mt-6 bg-college-primary/30 p-3 rounded-xl border border-college-accent/10 w-fit">
              <Mail size={18} className="text-college-accent" />
              <span className="font-semibold text-sm">contact@mvduniversity.edu</span>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h3 className="text-xl font-bold text-college-light tracking-wide border-b border-college-accent/20 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home Dashboard', path: '/' },
                { name: 'Upcoming Events', path: '/events' },
                { name: 'Contact Campus', path: '/contact' },
                { name: 'Admin Portal', path: '/admin-login' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="text-college-accent/80 hover:text-college-light transition-all duration-300 flex items-center gap-3 group font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-college-secondary group-hover:bg-college-light group-hover:scale-150 transition-all duration-300 shadow-[0_0_8px_rgba(218,241,222,0)] group-hover:shadow-[0_0_8px_rgba(218,241,222,0.8)]"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Column */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h3 className="text-xl font-bold text-college-light tracking-wide border-b border-college-accent/20 pb-2 inline-block">Connect With Us</h3>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, idx) => (
                <motion.a 
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -5, backgroundColor: "#163832" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl bg-college-dark/80 flex items-center justify-center text-college-light border border-college-accent/20 shadow-lg transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-8 p-5 rounded-2xl bg-college-primary/20 border border-college-accent/10 backdrop-blur-sm shadow-inner">
              <p className="text-sm text-college-light font-semibold mb-3">Subscribe to Campus Pulse</p>
              <div className="flex relative">
                <input 
                  type="email" 
                  placeholder="Student email..." 
                  className="bg-college-dark/60 text-white text-sm rounded-xl px-4 py-3 w-full outline-none focus:ring-2 focus:ring-college-accent border border-college-accent/20 transition-all placeholder:text-college-accent/40 pr-24"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-college-secondary hover:bg-college-accent text-white px-4 rounded-lg transition-colors text-sm font-bold shadow-md hover:text-college-dark">
                  Join
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div 
          variants={itemVariants} 
          className="mt-16 pt-8 border-t border-college-accent/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-college-accent/60 font-medium"
        >
          <p>&copy; {new Date().getFullYear()} MVD University. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-college-light transition-colors">Privacy Policy</a>
            <a href="#" className="w-1.5 h-1.5 rounded-full bg-college-accent/30 self-center"></a>
            <a href="#" className="hover:text-college-light transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
