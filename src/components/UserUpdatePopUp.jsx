import React, { useState } from 'react';
import { X, User, Mail } from 'lucide-react';
import axios from 'axios';

const UpdateUserDetail = ({ onClose }) => {
  const [detail, setDetail] = useState({
    fullName: '',
    email: '',
  });

  const handleUpdate = async () => {
    try {
      const res = await axios.patch('/api/users/update-account', detail);
      if (res?.data?.success) {
        sessionStorage.setItem('user', JSON.stringify(res.data.data));
        onClose();
      }
    } catch (err) {
      console.error('Error updating user detail:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          ✏️ Update Profile
        </h2>

        {/* Form */}
        <div className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <div className="px-3 text-gray-400">
                <User size={18} />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full px-2 py-2 outline-none text-gray-800"
                placeholder="Enter your full name"
                onChange={(e) =>
                  setDetail((prev) => ({ ...prev, fullName: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <div className="px-3 text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-2 py-2 outline-none text-gray-800"
                placeholder="Enter your email"
                onChange={(e) =>
                  setDetail((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium transition duration-200 active:scale-[0.98]"
          >
            🚀 Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserDetail;
