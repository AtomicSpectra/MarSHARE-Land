import { Link } from "react-router-dom";
import NavButtons from "./NavButtons";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 lg:px-12 py-4 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
      
      {/* Left */}
      <a href="/" className="group flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-all font-medium text-sm shadow-sm hover:shadow-md hover:border-slate-600">
        <svg className="w-4 h-4 text-teal-400 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
        <span>New Paste</span>
      </a>

      {/* Center - Improved Logo */}
      <Link to="/" className="flex items-center gap-3 select-none cursor-pointer group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.4)] group-hover:shadow-[0_0_25px_rgba(20,184,166,0.6)] transition-all duration-300">
          <svg className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-1">
          Mar<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-black">SHARE</span> 
          <span className="font-light text-slate-400 ml-1">Land</span>
        </h1>
      </Link>

      {/* Right */}
      <NavButtons />
    </nav>
  );
};

export default Navbar;