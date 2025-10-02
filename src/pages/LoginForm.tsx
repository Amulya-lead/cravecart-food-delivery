import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// --- SVG Icon Components ---
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const GoogleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C44.572 36.836 48 30.825 48 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);
// --- End of SVG Icons ---

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const cleanFullName = fullName.trim();

    // --- Password Length Validation ---
    if (cleanPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      setLoading(false); // Reset loading state
      return; // Stop the function from proceeding
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ 
        email: cleanEmail, 
        password: cleanPassword 
      });

      if (error) {
        alert(`Error logging in: ${error.message}`);
      } else {
        navigate('/home');
      }
    } else {
      // Sign Up Logic
      const { error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: cleanPassword,
        options: {
          data: {
            full_name: cleanFullName,
          }
        }
      });
      if (error) {
        alert(`Error signing up: ${error.message}`);
      } else {
        alert('Sign up successful! Please check your email to confirm your account.');
        setIsLogin(true);
      }
    }
    setLoading(false);
  };
  
  const handleSocialLogin = async (provider) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
        alert(`Error with ${provider} login: ${error.message}`);
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-purple-200 to-lavender-300 flex items-center justify-center p-4 font-sans">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-16 -left-20 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-16 -right-10 w-40 h-40 bg-lavender-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 -left-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 z-10 border border-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">CraveCart</h1>
            <p className="text-gray-600 mt-2">Your next meal, just a click away.</p>
          </div>

          <div className="flex border-b-2 border-gray-200">
            <button 
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-3 text-lg font-semibold transition-all duration-300 ease-in-out ${isLogin ? 'text-purple-600 border-b-4 border-purple-600' : 'text-gray-500'}`}
              disabled={loading}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-3 text-lg font-semibold transition-all duration-300 ease-in-out ${!isLogin ? 'text-purple-600 border-b-4 border-purple-600' : 'text-gray-500'}`}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"> <UserIcon /> </span>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300" 
                  required 
                />
              </div>
            )}
            
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"> <MailIcon /> </span>
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300" required />
            </div>
            
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"> <LockIcon /> </span>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300" required />
            </div>

            {isLogin && (
                 <div className="text-right">
                    <a href="#" className="text-sm text-purple-600 hover:underline hover:text-purple-800 transition-colors">Forgot Password?</a>
                </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center"> <div className="w-full border-t border-gray-300"></div> </div>
            <div className="relative bg-white bg-opacity-60 px-4 text-sm text-gray-500">Or continue with</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
             <button onClick={() => handleSocialLogin('google')} className="flex-1 flex items-center justify-center gap-3 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300" disabled={loading}>
                <GoogleIcon />
                <span className="font-semibold text-gray-700">Google</span>
            </button>
             <button onClick={() => handleSocialLogin('facebook')} className="flex-1 flex items-center justify-center gap-3 py-3 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300" disabled={loading}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29h-3.128V11.16h3.128V8.625c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.55h-3.12V24h5.693c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z" />
                </svg>
                <span className="font-semibold">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

