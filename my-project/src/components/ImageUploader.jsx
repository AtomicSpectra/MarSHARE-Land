import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

const ImageUploader = ({ setFile }) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]; // single file for backend

    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);

    // create preview URL
    setPreview(URL.createObjectURL(selectedFile));
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setFileName("");
  };

  return (
    <div className="border-2 border-dashed border-slate-700 hover:border-teal-500 bg-slate-900/50 p-10 rounded-xl text-center transition-all group flex flex-col items-center justify-center min-h-[300px] relative">
      
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

      {/* ICON */}
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* TEXT */}
      <p className="text-xl font-semibold text-slate-200 mb-2">
        Upload Image
      </p>
      <p className="text-slate-500 text-sm mb-6">
        Select an image (JPG, PNG, WEBP)
      </p>

      {/* INPUT */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full max-w-sm text-sm text-slate-400
          file:mr-4 file:py-2.5 file:px-6
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-slate-800 file:text-teal-400
          hover:file:bg-slate-700 file:cursor-pointer file:transition-colors
          cursor-pointer mx-auto"
      />

      {/* PREVIEW */}
      {preview && (
        <div className="mt-6">
          <p className="text-teal-400 text-sm mb-2">Preview:</p>
          <img
            src={preview}
            alt="preview"
            className="max-h-48 rounded-lg shadow-lg mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;