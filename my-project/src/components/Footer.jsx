// components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-16 py-10 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-bold text-xl text-slate-200">MarSHARE Land</p>
          <p className="text-sm">© 2026 | Made by <span className="text-teal-400">Gaurav Jain</span></p>
        </div>

        <div className="flex gap-6 text-2xl text-slate-500">
          <a href="#" className="hover:text-teal-400 transition-colors"><FaGithub /></a>
          <a href="#" className="hover:text-teal-400 transition-colors"><FaLinkedin /></a>
          <a href="#" className="hover:text-teal-400 transition-colors"><FaInstagram /></a>
          <a href="#" className="hover:text-teal-400 transition-colors"><FaFacebook /></a>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative flex-1">
            <input
              type="email"
              placeholder="Subscribe to newsletter"
              className="w-full bg-slate-900 border border-slate-700 text-white py-2.5 px-4 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all placeholder:text-slate-100"
            />
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl border border-slate-700 transition-colors whitespace-nowrap font-medium">
            Subscribe
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;