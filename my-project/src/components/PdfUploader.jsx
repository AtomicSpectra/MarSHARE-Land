import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

const PdfUploader = ({ setFile }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // backend expects single file
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
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Text */}
      <p className="text-xl font-semibold text-slate-200 mb-2">
        Upload PDF file
      </p>
      <p className="text-slate-500 text-sm mb-6">
        Select a PDF (Max 25MB)
      </p>

      {/* Input */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
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

export default PdfUploader;