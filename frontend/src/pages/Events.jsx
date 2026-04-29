import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    studentId: '',
    studentType: 'General',
    transactionId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterClick = (evt) => {
    setSelectedEvent(evt);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedEvent(null);
      setFormData({ studentName: '', studentEmail: '', studentId: '', studentType: 'General', transactionId: '' });
    }, 200);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/events/register', {
        eventId: selectedEvent.id.toString(),
        eventName: selectedEvent.title,
        ...formData
      });
      toast.success(`Successfully registered for ${selectedEvent.title}!`);
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Sample events data
  const eventsList = [
    {
      id: 1,
      title: "Annual Tech Symposium 2026",
      date: "Oct 15, 2026",
      time: "09:00 AM - 05:00 PM",
      location: "Main Auditorium",
      fee: "₹500",
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
      fee: "₹200",
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
      fee: "₹1000",
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
      fee: "₹150",
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
      fee: "Free",
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
                  <div className="inline-block mt-auto mb-4 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 w-max border border-slate-200 dark:border-slate-700">
                    Registration Fee: {evt.fee}
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-700/50 pt-4">
                    {evt.description}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRegisterClick(evt)}
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

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleCloseModal}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Register for Event</h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-6">{selectedEvent.title}</p>

              <form onSubmit={handleSubmitRegistration} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="studentEmail"
                    value={formData.studentEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                    placeholder="rahul@college.edu"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Student ID/Roll No</label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                      placeholder="e.g. 2110292"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course</label>
                    <select
                      name="studentType"
                      value={formData.studentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                    >
                      <option value="General">General</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="MCA">MCA</option>
                      <option value="MBA">MBA</option>
                    </select>
                  </div>
                </div>

                {selectedEvent.fee !== "Free" && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-slate-800/50 border border-blue-100 dark:border-blue-900/50 rounded-xl">
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-3">Payment details (Fee: {selectedEvent.fee})</h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                      {/* Placeholder for User's actual QR Code */}
                      <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg p-2 shadow-sm border border-slate-200 overflow-hidden flex items-center justify-center">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=8171683933@ptsbi" 
                          alt="Payment QR Code for Deepak Kumar" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 flex-1">
                        <p className="mb-2">1. Scan the QR code using any UPI app (GPay, PhonePe, Paytm, etc.)</p>
                        <p className="mb-2">2. Or pay directly to UPI ID: <span className="font-bold text-slate-800 dark:text-white bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">8171683933@ptsbi</span></p>
                        <p className="text-xs text-slate-500 italic">Please note down the transaction ID after successful payment.</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Transaction ID</label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                        placeholder="e.g. T230912140922"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Registering...' : 'Confirm Registration'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Events;
