import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import { MdDelete, MdContentCopy, MdVisibility } from "react-icons/md";

const Dashboard = () => {
  const [pastes, setPastes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyPastes = async () => {
    try {
      const res = await API.get("/paste/my-pastes");
      setPastes(res.data);
    } catch (err) {
      setError("Failed to load pastes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this paste?")) return;
    try {
      await API.delete(`/paste/${id}`);
      setPastes(pastes.filter((p) => p.pasteId !== id));
    } catch (err) {
      alert("Failed to delete paste");
    }
  };

  const copyLink = (id) => {
    const url = `${window.location.origin}/paste/${id}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  useEffect(() => {
    fetchMyPastes();
  }, []);

  if (loading) return <p className="text-center mt-20 text-slate-400 animate-pulse">Loading dashboard...</p>;

  return (
    <main className="max-w-6xl mx-auto mt-12 p-6 lg:p-10 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400">
              <MdVisibility />
            </div>
            Your Dashboard
          </h1>
          <p className="text-slate-400 bg-slate-800 px-4 py-1.5 rounded-full text-sm font-medium border border-slate-700">
            {pastes.length} Pastes Total
          </p>
        </div>

        {pastes.length === 0 ? (
          <div className="text-center py-20 bg-slate-950/50 rounded-2xl border border-dashed border-slate-800">
            <p className="text-slate-500 mb-6 text-lg">You haven't uploaded anything yet.</p>
            <Link to="/" className="px-8 py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/10">
              Create Your First Paste
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {pastes.map((paste) => (
              <div key={paste.pasteId} className="bg-slate-950/50 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-teal-500/50 group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 group-hover:border-teal-500/30 transition-colors">
                    <span className="text-xs font-bold text-teal-400 uppercase">{paste.type}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                      Paste {paste.pasteId}
                      {paste.isProtected && <span className="text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20 uppercase tracking-tighter">Locked</span>}
                    </h3>
                    <p className="text-slate-500 text-xs font-mono">Expires: {new Date(paste.expiresAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Link to={`/paste/${paste.pasteId}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl transition-all text-sm font-bold border border-slate-700">
                    <MdVisibility /> View
                  </Link>
                  <button onClick={() => copyLink(paste.pasteId)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-teal-400 px-4 py-2.5 rounded-xl transition-all text-sm font-bold border border-slate-700">
                    <MdContentCopy /> Copy Link
                  </button>
                  <button onClick={() => handleDelete(paste.pasteId)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2.5 rounded-xl transition-all text-sm font-bold border border-red-500/20">
                    <MdDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
