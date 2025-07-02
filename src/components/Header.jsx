import React, { useState } from 'react';
import { Bell, Upload, User, Search, Menu, X } from 'lucide-react';
import VideoTubeLogoDark from '../assets/logo';
import PublishModal from '../pages/video/PublishModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Header = () => {

  const navigate = useNavigate();
  const { isLogin, userData } = useAuth();
 
  const [userAvatar, setUserAvatar] = useState(userData?.data?.user?.avatar);
  const [openPublishPopup, setOpenPublishPopup] = useState(false);
  
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

 

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-8 py-3">
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate(isLogin ? '/user' : '/')}
          >
            <VideoTubeLogoDark />
          </div>

          {/* Search Bar */}
          {isLogin && (
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search videos, creators, and more..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl 
                           focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/40 
                           focus:bg-white transition-all duration-300 placeholder-gray-500
                           hover:bg-gray-50 hover:border-gray-300"
                />
                {searchValue && (
                  <button
                    onClick={() => setSearchValue('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Mobile Search Button */}
          {isLogin && (
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Right Section */}
          {isLogin ? (
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Upload Button */}
              <button
                onClick={() => setOpenPublishPopup(true)}
                className="flex items-center gap-2 px-4 py-2  bg-gradient-to-br from-indigo-500 to-purple-600
                         text-white rounded-xl hover:from-red-600 hover:to-red-700 
                         transition-all duration-300 hover:scale-105 hover:shadow-lg
                         font-medium text-sm"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Upload</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors group">
                  <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                                   rounded-full h-5 w-5 flex items-center justify-center 
                                   animate-pulse font-medium">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>
              </div>

              {/* User Avatar */}
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 hover:bg-gray-100 rounded-xl transition-colors">
                  <img
                    src={userAvatar}
                    alt="User Avatar"
                    className="w-8 h-8 lg:w-9 lg:h-9 rounded-full object-cover border-2 border-gray-200 
                             group-hover:border-red-300 transition-colors"
                  />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/user/login')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl 
                       hover: transition-all duration-300 hover:scale-105 
                       font-medium text-sm shadow-lg hover:shadow-xl"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Search Bar */}
        {isLogin && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/40 
                         transition-all duration-300"
              />
            </div>
          </div>
        )}
      </header>

      {/* Publish Modal */}
      {openPublishPopup && (
        <PublishModal onClose={() => setOpenPublishPopup(false)} />
      )}
    </>
  );
};

export default Header;