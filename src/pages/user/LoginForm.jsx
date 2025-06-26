import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    if(e.target.value.length > 0){
      setError('');
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace this with your actual authentication logic
    if (!formData.identifier || !formData.password) {
      setError('Please fill out all fields');
    } else {
      setError('');
      
      console.log('Login submitted:', formData);
      // Call backend API here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login to Your Account</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username or email"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account? <a href="/user/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
