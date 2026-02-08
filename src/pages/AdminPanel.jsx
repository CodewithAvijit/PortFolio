import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800 p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10">
          Admin<span className="text-blue-500">.</span>
        </h2>

        <nav className="space-y-4">
          <button className="block text-left w-full text-gray-300 hover:text-white">
            Dashboard
          </button>
          <button className="block text-left w-full text-gray-300 hover:text-white">
            Projects
          </button>
          <button className="block text-left w-full text-gray-300 hover:text-white">
            Messages
          </button>
          <button className="block text-left w-full text-gray-300 hover:text-white">
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-gray-400 text-sm">Projects</h3>
            <p className="text-3xl font-bold mt-2">2</p>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-gray-400 text-sm">Messages</h3>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-gray-400 text-sm">Skills</h3>
            <p className="text-3xl font-bold mt-2">10</p>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Admin Overview
          </h2>

          <p className="text-gray-400">
            This is a mock admin panel UI. Later, you can connect real
            backend APIs for project management, messages, and profile updates.
          </p>
        </div>

      </main>
    </div>
  );
};

export default AdminPanel;
