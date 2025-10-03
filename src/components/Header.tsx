import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShoppingCart, LogOut } from 'lucide-react';

const Header = ({ cartItemCount }: { cartItemCount: number }) => {
  const navigate = useNavigate();

  /**
   * Handles the user logout process.
   * It signs the user out from Supabase and redirects to the login page.
   */
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      // Navigate to the login page. The AuthProvider's listener will also
      // automatically handle the session change, ensuring a clean state.
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div 
          className="flex cursor-pointer items-center gap-2" 
          onClick={() => navigate('/home')}
          aria-label="CraveCart Home"
        >
          {/*  */}
          <span className="text-2xl font-bold text-gray-800">CraveCart</span>
        </div>
        <nav className="flex items-center gap-4">
          <div 
            className="relative cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100" 
            onClick={() => navigate('/cart')}
            aria-label={`View cart with ${cartItemCount} items`}
          >
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-semibold text-white">
                {cartItemCount}
              </span>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

