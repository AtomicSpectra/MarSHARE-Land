// components/TextBox.jsx
import React from "react";

const TextBox = ({ value, setValue }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Write or paste your content here..."
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
      className="w-full h-80 p-5 bg-slate-900 border border-slate-700 text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none transition-all text-lg placeholder:text-slate-600 shadow-inner"
    />
  );
};

export default TextBox;