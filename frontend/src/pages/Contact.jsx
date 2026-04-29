import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send to your backend API first
      await axios.post('http://localhost:5000/api/contact', formData);
      toast.success('Message saved to system!');
      
      // Then re-direct to WhatsApp directly to your number
      const whatsappNumber = "918171683933";
      const text = `Hello MVD University!\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}`;
      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to process message.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const infoCards = [
    {
      icon: <MapPin size={28} className="text-blue-500" />,
      title: "Our Address",
      details: "Gla University Mathura",
      color: "from-blue-500/20 to-blue-600/5",
      borderColor: "border-blue-500/30"
    },
    {
      icon: <Phone size={28} className="text-purple-500" />,
      title: "Phone Number",
      details: "+91 8171683933\nMon-Fri: 9am - 5pm",
      color: "from-purple-500/20 to-purple-600/5",
      borderColor: "border-purple-500/30"
    },
    {
      icon: <Mail size={28} className="text-pink-500" />,
      title: "Email Address",
      details: "deepak.kumar@gla\nvishal.singh@gla.ac",
      color: "from-pink-500/20 to-pink-600/5",
      borderColor: "border-pink-500/30"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-10">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob dark:opacity-30"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-4000 dark:opacity-30"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-800 dark:text-white tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Touch</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Have questions, feedback, or just want to say hello? We'd love to hear from you. Drop us a message below.
          </p>
        </motion.div>

        {/* Main Grid: Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 mb-20">
          
          {/* Contact Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 md:p-10 rounded-3xl glass bg-white/60 dark:bg-slate-800/60 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            
            <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white">Send us a Message</h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Floating Label Input - Name */}
              <div className="relative z-0 w-full mb-6 group">
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  placeholder=" " 
                  required 
                />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
              </div>

              {/* Floating Label Input - Email */}
              <div className="relative z-0 w-full mb-6 group">
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  placeholder=" " 
                  required 
                />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
              </div>

              {/* Floating Label Input - Message */}
              <div className="relative z-0 w-full mb-6 group">
                <textarea 
                  name="message" 
                  id="message" 
                  rows="4" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none" 
                  placeholder=" " 
                  required
                ></textarea>
                <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Message</label>
              </div>

              <motion.button 
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message To WhatsApp'}
                {!isSubmitting && <Send size={18} />}
              </motion.button>
            </form>
          </motion.div>

          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-3xl overflow-hidden glass shadow-2xl border-slate-200 dark:border-slate-700 relative min-h-[400px]"
          >
            {/* Using a Google Maps embed iframe for GLA University */}
            <iframe 
              src="https://maps.google.com/maps?q=27.6056,77.5937&z=15&output=embed" 
              className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

        </div>

        {/* Info Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
        >
          {infoCards.map((info, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`p-8 rounded-3xl glass bg-gradient-to-br ${info.color} border ${info.borderColor} backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col items-center text-center group`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {info.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">{info.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {info.details}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>

    </div>
  );
};

export default Contact;
