// App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import UploadHandler from "./components/UploadHandler";
import Footer from "./components/Footer";
import PasteView from "./pages/PasteView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30">
          <Navbar />

          <Routes>
            {/* Home */}
            <Route path="/" element={
              <main className="flex-1 max-w-4xl mx-auto w-full p-6 lg:p-8 bg-slate-900 shadow-2xl rounded-2xl mt-8 border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="relative z-10">
                  <UploadHandler />
                </div>
              </main>
            } />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Paste page */}
            <Route path="/paste/:id" element={<PasteView />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
