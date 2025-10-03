import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/home', { replace: true });
    }
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">CraveCart Login</h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white shadow-md transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
            <div className="h-px flex-grow bg-gray-300"></div>
            <div className="mx-4 text-sm font-medium text-gray-500">OR</div>
            <div className="h-px flex-grow bg-gray-300"></div>
        </div>

        <button
          onClick={() => handleSocialLogin("google")}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google icon" className="h-5 w-5" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;