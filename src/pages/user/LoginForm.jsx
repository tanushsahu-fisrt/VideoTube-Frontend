import React, { useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const navigate = useNavigate();
  const { setIsLogin } = useAuth(); 

  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setError('');
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.identifier || !formData.password) {
      setError('Please fill out all fields');
    } else {
      setError('');
      const loginApi = await axios.post('/api/users/login',{
        email : formData.identifier,
        password : formData.password
      })
      const data = loginApi.data;
      if(data.statusCode == 200){
        setIsLogin(true);
        sessionStorage.setItem("accessToken",data.data?.accessToken);
        sessionStorage.setItem("user",JSON.stringify(data.data.user));
        navigate('/user')
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">

        <div className="bg-white/80  p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back 👋</h2>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Enter username or email"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{' '}
            <a href="/user/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
