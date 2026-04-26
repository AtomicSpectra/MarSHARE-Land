import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavButtons = () => {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="flex gap-3">
        <Link to="/dashboard" className="px-5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white transition-all font-medium text-sm">
          Dashboard
        </Link>
        <button 
          onClick={logout}
          className="px-5 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all font-medium text-sm"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <Link to="/login" className="px-5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white transition-all font-medium text-sm">
        Login
      </Link>
      <Link to="/signup" className="px-5 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-500 transition-all font-medium text-sm shadow-[0_0_10px_rgba(20,184,166,0.3)] hover:shadow-[0_0_15px_rgba(20,184,166,0.5)]">
        Sign Up
      </Link>
    </div>
  );
};

export default NavButtons;