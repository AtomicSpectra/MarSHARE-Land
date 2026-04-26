import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-teal-500/10 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h2>
        <p className="text-slate-400 text-center mb-8 text-sm">Log in to access your dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all placeholder:text-slate-600"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              required
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all placeholder:text-slate-600"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-xs font-medium bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-teal-400 hover:to-blue-500 transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="text-slate-400 text-center mt-6 text-sm">
          Don't have an account? <Link to="/signup" className="text-teal-400 hover:text-teal-300 font-bold transition-colors">Sign Up</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
