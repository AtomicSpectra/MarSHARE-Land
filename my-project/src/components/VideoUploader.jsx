import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

const VideoUploader = ({ setFile }) => {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]; // backend supports single file
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const removeFile = () => {
    setFile(null);
    setFileName("");
  };

  return (
    <div className="border-2 border-dashed border-slate-700 hover:border-teal-500 bg-slate-900/50 p-12 rounded-xl text-center transition-all group flex flex-col items-center justify-center min-h-[300px] relative">
      
      {fileName && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-800 py-1.5 px-3 rounded-full border border-slate-700 shadow-lg z-20 animate-in fade-in slide-in-from-top-2">
          <button 
            onClick={removeFile}
            className="text-red-400 hover:text-red-300 transition-colors p-0.5"
            title="Remove file"
          >
            <IoCloseCircle size={20} />
          </button>
          <span className="text-xs text-slate-300 font-medium truncate max-w-[150px]">{fileName}</span>
        </div>
      )}

      {/* Icon */}
      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors">
        <svg
          className="w-8 h-8 text-slate-400 group-hover:text-teal-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Text */}
      <p className="text-xl font-semibold text-slate-200 mb-2">
        Upload Video file
      </p>
      <p className="text-slate-500 text-sm mb-6">
        Select a video (Max 25MB recommended)
      </p>

      {/* Input */}
      <input
        type="file"
        accept="video/*"
        onChange={handleChange}
        className="block w-full max-w-sm text-sm text-slate-400
          file:mr-4 file:py-2.5 file:px-6
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-slate-800 file:text-teal-400
          hover:file:bg-slate-700 file:cursor-pointer file:transition-colors
          cursor-pointer mx-auto"
      />
    </div>
  );
};

export default VideoUploader;