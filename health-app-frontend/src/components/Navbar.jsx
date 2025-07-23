import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/dashboard" className="text-2xl font-bold text-blue-400 tracking-tight">HealthMate</Link>
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
              <Link to="/history" className="hover:text-blue-400 transition">History</Link>
              <button onClick={handleLogout} className="ml-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
              <Link to="/signup" className="ml-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
