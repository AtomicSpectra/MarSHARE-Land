import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdContentCopy, MdCheckCircle } from "react-icons/md";
import API from "../api/api";

const PasteView = () => {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchPaste = async (pwd = "") => {
    try {
      setLoading(true);
      const res = await API.get(`/paste/${id}`, {
        params: { password: pwd },
      });

      setPaste(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error loading paste");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetchPaste();
  }, [id]);

  if (loading && !paste) {
    return (
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 lg:p-12 bg-slate-900 shadow-2xl rounded-2xl mt-8 border border-slate-800 relative overflow-hidden flex items-center justify-center min-h-[400px]">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none"></div>
         <div className="relative z-10 flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
           <p className="text-slate-400 font-medium animate-pulse">Decrypting Paste...</p>
         </div>
      </main>
    );
  }

  if (!paste && error === "Password required") {
    return (
      <main className="flex-1 max-w-2xl mx-auto w-full p-6 lg:p-10 bg-slate-900 shadow-2xl rounded-2xl mt-8 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-700">
            <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Password Protected</h2>
          <p className="text-slate-400 mb-8">This paste is securely locked. Please enter the password to view its contents.</p>

          <div className="w-full flex flex-col sm:flex-row gap-3">
            <input
              type="password"
              placeholder="Enter secure password..."
              className="flex-1 bg-slate-950 border border-slate-700 text-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all placeholder:text-slate-600 shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchPaste(password)}
            />

            <button
              onClick={() => fetchPaste(password)}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-xl hover:from-teal-400 hover:to-blue-500 transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] transform hover:-translate-y-0.5"
            >
              Unlock
            </button>
          </div>
          {error && error !== "Password required" && (
            <p className="text-red-400 mt-4 font-medium">{error}</p>
          )}
        </div>
      </main>
    );
  }

  if (!paste) {
    return (
      <main className="flex-1 max-w-4xl mx-auto w-full p-12 text-center bg-slate-900 shadow-2xl rounded-2xl mt-8 border border-slate-800">
        <h2 className="text-2xl text-red-400 font-bold mb-2">Paste Not Found</h2>
        <p className="text-slate-400">{error || "This paste might have expired or does not exist."}</p>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-4xl mx-auto w-full p-6 lg:p-8 bg-slate-900 shadow-2xl rounded-2xl mt-8 border border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-slate-800 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              View Paste
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-mono">ID: {id}</p>
          </div>
          <div className="flex items-center gap-3">
            {(paste.type === "text" || paste.type === "image") && (
              <button
                onClick={() => copyToClipboard(paste.content)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all border ${
                  copied 
                    ? "bg-green-500/20 text-green-400 border-green-500/50" 
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:border-teal-500 hover:text-white"
                }`}
              >
                {copied ? <MdCheckCircle size={18} /> : <MdContentCopy size={18} />}
                {copied ? "Copied!" : paste.type === "text" ? "Copy Text" : "Copy Image URL"}
              </button>
            )}
            <span className="px-3 py-1 bg-slate-800 text-teal-400 border border-slate-700 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              {paste.type}
            </span>
          </div>
        </div>

        <div className="bg-slate-950/50 rounded-xl border border-slate-800/80 overflow-hidden shadow-inner">
          {/* TEXT */}
          {paste.type === "text" && (
            <div className="p-6 relative group">
              <pre className="text-slate-200 whitespace-pre-wrap text-lg leading-relaxed overflow-x-auto" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                {paste.content}
              </pre>
            </div>
          )}

          {/* IMAGE */}
          {paste.type === "image" && (
            <div className="p-4 flex justify-center bg-slate-900/50">
              <img src={paste.content} alt="paste" className="max-w-full rounded-lg shadow-md border border-slate-700" />
            </div>
          )}

          {/* VIDEO */}
          {paste.type === "video" && (
            <div className="p-2 bg-slate-900/50">
              <video controls src={paste.content} className="w-full rounded-lg shadow-md" />
            </div>
          )}

          {/* AUDIO */}
          {paste.type === "audio" && (
            <div className="p-8 flex justify-center items-center bg-slate-900/50">
              <audio controls src={paste.content} className="w-full max-w-md" />
            </div>
          )}

          {/* PDF */}
          {paste.type === "pdf" && (() => {
            let secureUrl = paste.content.replace("http://", "https://");
            
            // Force .pdf extension if missing
            if (!secureUrl.toLowerCase().endsWith(".pdf")) {
              secureUrl += ".pdf";
            }

            // Create download URL securely (fl_attachment is only supported for image/video resource types, not raw)
            let downloadUrl = secureUrl;
            if (secureUrl.includes("/image/upload/")) {
              downloadUrl = secureUrl.replace("/image/upload/", "/image/upload/fl_attachment/");
            }

            return (
              <div className="bg-slate-900/50 flex flex-col">
                <object
                  data={secureUrl}
                  type="application/pdf"
                  className="w-full h-[700px] border-0 rounded-t-xl"
                >
                  <div className="flex flex-col items-center justify-center h-[400px] text-center p-8">
                    <svg className="w-16 h-16 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <p className="text-slate-300 mb-4">Your browser does not support embedded PDFs.</p>
                    <a href={downloadUrl} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors">Download PDF Instead</a>
                  </div>
                </object>
                
                <div className="p-4 border-t border-slate-800 text-center bg-slate-900">
                  <a 
                    href={downloadUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-teal-400 font-bold rounded-xl border border-slate-700 hover:border-teal-500 transition-all shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download PDF to Computer
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </main>
  );
};

export default PasteView;
