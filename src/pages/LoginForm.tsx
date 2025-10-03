import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

// --- SVG Icon Components for a cleaner look ---
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const LoginForm = () => {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session) {
      navigate('/home', { replace: true });
    }
  }, [session, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate('/home', { replace: true });
    setIsSubmitting(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/home` },
    });
    if (error) {
      setError(`Error with ${provider} login: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-gray-900 font-sans text-white">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-blob rounded-full bg-purple-500 opacity-20 blur-2xl filter"></div>
      <div className="animation-delay-2000 absolute top-1/4 right-1/4 h-72 w-72 animate-blob rounded-full bg-indigo-500 opacity-20 blur-2xl filter"></div>
      <div className="animation-delay-4000 absolute bottom-1/4 left-1/3 h-72 w-72 animate-blob rounded-full bg-pink-500 opacity-20 blur-2xl filter"></div>
      
      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CraveCart</h1>
          <p className="mt-2 text-indigo-200">Your next meal, just a click away.</p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-500/30 p-3 text-center text-sm text-white">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MailIcon />
            </span>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 pl-10 text-white transition duration-300 placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockIcon />
            </span>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 pl-10 text-white transition duration-300 placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <div className="h-px flex-grow bg-white/20"></div>
          <div className="mx-4 text-sm font-medium text-gray-300">OR</div>
          <div className="h-px flex-grow bg-white/20"></div>
        </div>

        <button
          onClick={() => handleSocialLogin("google")}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/10 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google icon" className="h-5 w-5" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;