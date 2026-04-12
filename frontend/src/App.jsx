import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { Moon, Sun } from 'lucide-react';

import StudentDashboard from './pages/StudentDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddNotice from './pages/AddNotice';
import NoticeDetails from './pages/NoticeDetails';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Custom Private Route implementation
const PrivateRoute = ({ children }) => {
  const { admin } = React.useContext(AuthContext);
  return admin ? children : <Navigate to="/admin-login" />;
};

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
    { name: 'Add Notice', path: '/admin/add-notice' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <header className="bg-college-dark/95 backdrop-blur-md text-college-light sticky top-0 z-50 border-b border-college-accent/20 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-college-light to-college-accent hover:scale-105 transition-transform">
          EduBoard
        </Link>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`font-semibold tracking-wide transition-all pb-1 border-b-2 hover:-translate-y-0.5 ${
                  location.pathname === link.path 
                    ? 'border-college-accent text-white drop-shadow-[0_0_10px_rgba(125,160,202,0.8)]' 
                    : 'border-transparent text-college-secondary hover:text-college-light hover:border-college-light/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-xl border border-college-secondary/30 bg-college-primary/50 hover:bg-college-secondary transition-all shadow-sm hover:shadow-md transform hover:scale-105"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} className="text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" /> : <Moon size={20} className="text-college-light drop-shadow-[0_0_8px_rgba(193,232,255,0.8)]" />}
          </button>
        </div>
      </div>
    </header>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            
            <main className="container mx-auto py-8 px-4 h-full relative">
              <Routes>
                <Route path="/" element={<StudentDashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/notice/:id" element={<NoticeDetails />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route 
                  path="/admin" 
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin/add-notice" 
                  element={
                    <PrivateRoute>
                      <AddNotice />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </main>
          </div>
          <Toaster 
            position="top-right" 
            toastOptions={{
              className: 'dark:bg-slate-800 dark:text-white',
              duration: 3000,
            }}
          />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
