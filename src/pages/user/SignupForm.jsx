import React, { useState } from 'react';
import Header from '../../components/Header';
import { Sparkles } from 'lucide-react';
import { apiCall } from "../../utils/ApiCall"
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    avatar: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit =  async (e) => {
    e.preventDefault();
    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    const response  = await apiCall(`/api/users/register`,'POST',payload)

    if(response?.success)
      navigate('/user/login')
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
        
        <div className="bg-white text-center p-8 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="inline-flex gap-1 items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
              <span className="text-white text-lg font-bold">VT</span>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-center text-gray-500 mb-6 text-sm">Join us on your video journey</p>

          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <div className='flex gap-2'>
            <label htmlFor="avatar" className='ml-2'>avatar</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-600"
              />
            </div>
            <div className='flex gap-2'>
            <label htmlFor="coverImage" className='text-md'>cover image : </label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-600"
              />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition-all"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/user/login" className="text-purple-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
