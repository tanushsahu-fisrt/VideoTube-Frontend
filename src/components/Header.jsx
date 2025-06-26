import React from 'react';
import { Bell, Upload, User } from 'lucide-react'; // Using lucide-react icons
import VideoTubeLogoDark from '../assets/logo';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  
  const navigate = useNavigate();
  const { isLogin, userData } = useAuth();

  
  return (
    <header className="flex items-center justify-between px-8 py-2 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      {
      isLogin ? (
      <p
      onClick={() => navigate('/user')}>
      <VideoTubeLogoDark/>
      </p>
      ) :
      (
      <p
      onClick={() => navigate('/')}>
      <VideoTubeLogoDark/>
      </p>
      )
      }
      

      {/* Search Bar */}
      {isLogin ? (
        <div className="flex-1 max-w-xl mx-6">
          <input
            type="text"
            placeholder="Search videos..."
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      ) : (
        ''
      )}

      {/* Right Icons */}
      { isLogin ? (
        <div className="flex items-center gap-6">
          <Upload className="w-6 h-6 text-gray-700 hover:text-red-500 cursor-pointer" />
          <Bell className="w-6 h-6 text-gray-700 hover:text-red-500 cursor-pointer" />
          <img
            src={userData?.data?.user?.avatar}
            alt="User"
            className="w-9 h-9 rounded-full object-cover cursor-pointer"
          />
        </div>
      ) : (
        <div 
        className='w-9 h-9 rounded-full mx-5 cursor-pointer'
        onClick={() => navigate("/user/login")}
        >
          <User />
          <p className='mx-auto font-bold'>signIn</p>
        </div>
      )}
    </header>
  );
};

export default Header;
