// components/CreateButton.jsx
import React from "react";

const CreateButton = () => {
  return (
    <button className="w-full bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 text-white font-bold py-4 rounded-xl hover:from-teal-400 hover:via-blue-400 hover:to-indigo-400 transition-all text-xl shadow-[0_10px_20px_-10px_rgba(20,184,166,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(20,184,166,0.6)] transform hover:-translate-y-1">
      Create Paste
    </button>
  );
};

export default CreateButton;