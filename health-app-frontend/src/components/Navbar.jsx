import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/dashboard" className="text-xl md:text-2xl font-bold text-blue-400 tracking-tight">
          HealthMate
        </Link>
        
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
              <Link to="/history" className="hover:text-blue-400 transition">History</Link>
              <button onClick={handleLogout} className="ml-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
              <Link to="/signup" className="ml-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-2 space-y-2">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block py-2 text-gray-300 hover:text-blue-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/history" 
                  className="block py-2 text-gray-300 hover:text-blue-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="w-full text-left py-2 px-4 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 text-gray-300 hover:text-blue-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block py-2 px-4 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
