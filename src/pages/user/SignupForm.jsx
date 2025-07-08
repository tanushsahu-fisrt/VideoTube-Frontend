import React, { useState } from 'react';
import Header from '../../components/Header';
import { apiCall } from '../../utils/ApiCall';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Lock, User, UserPlus, Image, ArrowRight,
} from 'lucide-react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    avatar: null,
    coverImage: null,
  });

  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    const response = await apiCall('/api/users/register', 'POST', payload);
    if (response?.success) navigate('/user/login');

    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold flex gap-1 text-gray-800 mx-auto items-center justify-center">
                    <UserPlus size={30} className="text-purple-600 "/> Create Account
                  </h2>
                  <p className="text-gray-600 text-sm">Join us and share your videos with the world</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <div className="relative">
                      <User className={`absolute left-4 top-3 h-5 w-5 ${focusedField === 'username' ? 'text-indigo-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('username')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Enter your username"
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 placeholder-gray-400 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail className={`absolute left-4 top-3 h-5 w-5 ${focusedField === 'email' ? 'text-indigo-500' : 'text-gray-400'}`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Enter your email"
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 placeholder-gray-400 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <Image className={`absolute left-4 top-3 h-5 w-5 ${focusedField === 'fullName' ? 'text-indigo-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Enter your full name"
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 placeholder-gray-400 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock className={`absolute left-4 top-3 h-5 w-5 ${focusedField === 'password' ? 'text-indigo-500' : 'text-gray-400'}`} />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Enter your password"
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 placeholder-gray-400 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full text-sm text-gray-700 border border-gray-300 px-3 py-2 rounded-md cursor-pointer bg-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                    <input
                      type="file"
                      name="coverImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full text-sm text-gray-700 border border-gray-300 px-3 py-2 rounded-md cursor-pointer bg-white/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 
                             hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 
                             rounded-xl transition-all duration-300 transform hover:scale-[1.02] 
                             shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Signing up...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign Up</span>
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </div>
                  </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{' '}
                  <a
                    href="/user/login"
                    className="font-semibold text-indigo-600 hover:text-indigo-800 transition hover:underline"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>

          
            <p className="text-center text-xs text-gray-500 mt-6">
              Secure signup powered by modern tech 🔒
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
