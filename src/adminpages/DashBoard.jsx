import React from "react";
import { FaProjectDiagram, FaEnvelope, FaCode } from "react-icons/fa";

const DashBoard = ({ projects, messages, skills, loading }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-[#0a0f16] border border-gray-800 rounded-xl p-6 flex items-center justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-gray-400 text-sm font-medium">Total Projects</h3>
            <p className="text-4xl font-bold mt-2 text-white">
              {loading ? "..." : projects?.length || 0}
            </p>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500 text-2xl group-hover:scale-110 transition-transform duration-300">
            <FaProjectDiagram />
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl" />
        </div>

        <div className="bg-[#0a0f16] border border-gray-800 rounded-xl p-6 flex items-center justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-gray-400 text-sm font-medium">Messages</h3>
            <p className="text-4xl font-bold mt-2 text-white">
              {loading ? "..." : messages?.length || 0}
            </p>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500 text-2xl group-hover:scale-110 transition-transform duration-300">
            <FaEnvelope />
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-600/20 rounded-full blur-2xl" />
        </div>

        <div className="bg-[#0a0f16] border border-gray-800 rounded-xl p-6 flex items-center justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-gray-400 text-sm font-medium">Skills Listed</h3>
            <p className="text-4xl font-bold mt-2 text-white">
              {loading ? "..." : skills?.length || 0}
            </p>
          </div>
          <div className="p-3 bg-green-500/10 rounded-lg text-green-500 text-2xl group-hover:scale-110 transition-transform duration-300">
            <FaCode />
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-green-600/20 rounded-full blur-2xl" />
        </div>
      </div>

      <div className="bg-[#0a0f16] border border-gray-800 rounded-xl p-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back, Admin</h2>
        <p className="text-gray-400">Here is your portfolio performance overview.</p>
      </div>
    </div>
  );
};

export default DashBoard;