import React, { useState } from 'react';
import { Circle } from 'lucide-react';
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
        sessionStorage.removeItem('user');
        sessionStorage.setItem('user', JSON.stringify(res.data.data));
        onClose();
      }
    } catch (err) {
      console.error('Error updating user detail:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          <Circle color="red" />
        </button>

        <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
          ✏️ Update User Details
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setDetail((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setDetail((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            🚀 Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserDetail;
