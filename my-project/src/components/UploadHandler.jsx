import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

import TextBox from "./TextBox";
import PdfUploader from "./PdfUploader";
import ImageUploader from "./ImageUploader";
import VideoUploader from "./VideoUploader";
import AudioUploader from "./AudioUploader";

const UploadHandler = () => {
  const [type, setType] = useState("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [expiresIn, setExpiresIn] = useState("10m");
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (type) {
      case "pdf":
        return <PdfUploader setFile={setFile} />;
      case "image":
        return <ImageUploader setFile={setFile} />;
      case "video":
        return <VideoUploader setFile={setFile} />;
      case "audio":
        return <AudioUploader setFile={setFile} />;
      default:
        return <TextBox value={text} setValue={setText} />;
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("type", type);
      formData.append("expiresIn", expiresIn);
      
      if (passwordEnabled && password) {
        formData.append("password", password);
      }

      if (type === "text") {
        formData.append("content", text);
      } else {
        formData.append("file", file);
      }

      const res = await API.post("/paste/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const pasteId = res.data.pasteId;
      navigate(`/paste/${pasteId}`);

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || err.message || "Error creating paste");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* TYPE SELECT */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          New Paste
        </h2>

        <select
          className="bg-slate-900 border border-slate-700 text-slate-200 p-2.5 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium transition-all"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="text">Text / Code</option>
          <option value="image">Image Upload</option>
          <option value="pdf">PDF Document</option>
          <option value="audio">Audio File</option>
          <option value="video">Video File</option>
        </select>
      </div>

      {/* CONTENT */}
      <div className="bg-slate-950/30 rounded-xl mb-8">
        {renderComponent()}
      </div>

      {/* EXPIRY & PASSWORD COLUMNS */}
      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        {/* Expiration */}
        <div className="space-y-2">
           <label className="text-sm font-semibold text-slate-400 ml-1 uppercase tracking-wider">Expiration Time</label>
           <div className="relative">
             <select 
               className="w-full bg-slate-950 border border-slate-800 text-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all appearance-none cursor-pointer"
               value={expiresIn}
               onChange={(e) => setExpiresIn(e.target.value)}
             >
              <option value="10m">10 Minutes</option>
              <option value="30m">30 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="3h">3 Hours</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 transition-all hover:border-slate-700 flex flex-col justify-center h-[76px] mt-7">
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={passwordEnabled}
                onChange={() => setPasswordEnabled(!passwordEnabled)}
                className="peer appearance-none w-5 h-5 rounded border border-slate-600 bg-slate-900 checked:bg-teal-500 checked:border-teal-500 transition-all cursor-pointer"
              />
              <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <span className="text-slate-300 group-hover:text-white transition-colors select-none font-medium">Enable Password</span>
          </label>
        </div>
      </div>
      
      {/* PASSWORD INPUT REVEAL */}
      <div className={`grid transition-all duration-300 ease-in-out ${passwordEnabled ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <input
            type="password"
            placeholder="Enter a secure password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all placeholder:text-slate-600 shadow-inner"
          />
        </div>
      </div>

      {/* CREATE BUTTON */}
      <div className="mt-8">
        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 text-white font-bold py-4 rounded-xl hover:from-teal-400 hover:via-blue-400 hover:to-indigo-400 transition-all text-xl shadow-[0_10px_20px_-10px_rgba(20,184,166,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(20,184,166,0.6)] transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Paste..." : "Create Paste"}
        </button>
      </div>
    </div>
  );
};

export default UploadHandler;