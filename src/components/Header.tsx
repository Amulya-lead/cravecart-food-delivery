import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ShoppingCart, LogOut, ChevronDown, User } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// --- A simple, stylish SVG logo for CraveCart ---
const CraveCartLogo = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4H34L44 24L24 44L4 24L14 4Z" fill="#7C3AED" />
    <path d="M4 24L14 4H24L4 24Z" fill="#A78BFA" />
    <path d="M44 24L34 4H24L44 24Z" fill="#6D28D9" />
    <path d="M4 24L24 44L44 24H4Z" fill="#C4B5FD" />
  </svg>
);

const Header = ({ cartItemCount }: { cartItemCount: number }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- Fetch user information on component mount ---
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  
  // --- Close dropdown when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // --- Generate a simple avatar from user's email ---
  const getInitials = (email: string | undefined) => {
    return email ? email.substring(0, 2).toUpperCase() : <User size={20} />;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div 
          className="flex cursor-pointer items-center gap-3 transition-transform hover:scale-105" 
          onClick={() => navigate('/home')}
          aria-label="CraveCart Home"
        >
          <CraveCartLogo />
          <span className="text-2xl font-bold tracking-tight text-gray-800">CraveCart</span>
        </div>

        <nav className="flex items-center gap-5">
          {/* --- Cart Icon --- */}
          <div 
            className="relative cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-200" 
            onClick={() => navigate('/cart')}
            aria-label={`View cart with ${cartItemCount} items`}
          >
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-semibold text-white ring-2 ring-white">
                {cartItemCount}
              </span>
            )}
          </div>

          {/* --- User Profile Dropdown --- */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 rounded-full py-1 pl-2 pr-3 transition-colors hover:bg-gray-200"
              aria-label="Open user menu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-sm font-semibold text-white">
                {getInitials(user?.email)}
              </div>
              <ChevronDown size={16} className={`text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* --- Dropdown Menu --- */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-2">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">Signed in as</p>
                    <p className="truncate text-sm text-gray-500">{user?.email || 'Guest'}</p>
                  </div>
                  <div className="my-1 h-px bg-gray-100" />
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;


