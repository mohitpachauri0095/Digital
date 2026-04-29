import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      toast.success('Registration successful! Please log in.');
      navigate('/admin-login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 min-h-[70vh]">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md transition-all hover:shadow-2xl hover:border-blue-100 duration-300">
        <div className="text-center mb-8">
          <div className="mx-auto bg-blue-50 text-blue-600 w-16 h-16 flex items-center justify-center rounded-full mb-4 transform transition-transform hover:scale-110 duration-300">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">Register</h2>
          <p className="text-slate-500 mt-2">Create a new account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm flex items-start border border-red-100">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                name="username"
                required
                className="w-full pl-10 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                required
                className="w-full pl-10 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                required
                className="w-full pl-10 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="confirmPassword"
                required
                className="w-full pl-10 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-college-primary hover:bg-college-secondary text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all disabled:bg-blue-300 transform active:scale-95"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <UserPlus size={18} className="mr-2" /> Register
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-medium text-slate-600">
          Already have an account?{' '}
          <Link to="/admin-login" className="text-blue-600 hover:text-blue-800 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
