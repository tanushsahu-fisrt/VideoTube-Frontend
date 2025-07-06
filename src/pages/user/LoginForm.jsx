import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

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
    try{
      if (!formData.identifier || !formData.password) {
        setError('Please fill out all fields');
      } else {
          setError('');
          setIsLoading(true);
          const loginApi = await axios.post('/api/users/login',{
            email : formData.identifier,
            username : formData.identifier,
            password : formData.password
          })
          const data = loginApi.data;
          if(data.success){
            setIsLogin(true);
            sessionStorage.setItem("accessToken",data.data?.accessToken);
            sessionStorage.setItem("user",JSON.stringify(data.data.user));
            navigate('/user')
          }
        }
      }catch(err){
        console.log(err)
      }finally{
        setIsLoading(false);
      }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            {/* Main Card */}
            <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex gap-1 items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                    <span className="text-white text-lg font-bold">VT</span>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600">Sign in to continue your journey</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm text-center font-medium">{error}</p>
                  </div>
                )}

                {/* Form */}
                <div className="space-y-6">
                  {/* Email/Username Field */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email or Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 transition-colors duration-200 ${
                          focusedField === 'identifier' ? 'text-indigo-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <input
                        type="text"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('identifier')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Enter your email or username"
                        className={`w-full pl-12 pr-4 py-4 bg-white/50 border-2 rounded-xl transition-all duration-300
                          placeholder-gray-400 text-gray-800 font-medium
                          ${focusedField === 'identifier' 
                            ? 'border-indigo-400 bg-white/80 shadow-lg ring-4 ring-indigo-100' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                          focus:outline-none`}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className={`h-5 w-5 transition-colors duration-200 ${
                          focusedField === 'password' ? 'text-indigo-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Enter your password"
                        className={`w-full pl-12 pr-12 py-4 bg-white/50 border-2 rounded-xl transition-all duration-300
                          placeholder-gray-400 text-gray-800 font-medium
                          ${focusedField === 'password' 
                            ? 'border-indigo-400 bg-white/80 shadow-lg ring-4 ring-indigo-100' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                          focus:outline-none`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="text-right">
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 
                             hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 
                             rounded-xl transition-all duration-300 transform hover:scale-[1.02] 
                             shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed
                             disabled:hover:scale-100 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500 bg-white/50 rounded-full">or</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 
                                   rounded-xl hover:border-gray-300 hover:bg-white/50 transition-all duration-300 
                                   font-medium text-gray-700 hover:scale-[1.02]">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                    Continue with Google
                  </button>
                  <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 
                                   rounded-xl hover:border-gray-300 hover:bg-white/50 transition-all duration-300 
                                   font-medium text-gray-700 hover:scale-[1.02]">
                    <div className="w-5 h-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                    Continue with GitHub
                  </button>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600 mt-8">
                  Don't have an account?{' '}
                  <a href="/user/signup" className="font-semibold text-indigo-600 hover:text-indigo-800 
                                                  transition-colors hover:underline">
                    Create one now
                  </a>
                </p>
              </div>
            </div>

            {/* Bottom decorative text */}
            <p className="text-center text-xs text-gray-500 mt-6">
              Secure login powered by advanced encryption
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;