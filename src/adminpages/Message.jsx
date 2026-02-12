import React from "react";
import axios from "axios";
import { FaReply, FaTrash } from "react-icons/fa";

const Message = ({ messages, onRefresh }) => {

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const token = localStorage.getItem("token");
      const authConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };


      await axios.delete(`https://portfolio-backend-t56b.onrender.com/contacts/${id}`, authConfig);
      
      if (onRefresh) onRefresh();
      
    } catch (err) {
      console.error("Delete Error:", err);
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please login again.");
      } else {
        alert("Failed to delete message. Check permissions.");
      }
    }
  };

  const handleReply = (email, name) => {
    window.location.href = `mailto:${email}?subject=Re: Inquiry from ${name}&body=Hi ${name},%0D%0A%0D%0AThanks for reaching out!`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-white">Inbox</h2>
        <span className="bg-purple-500/10 text-purple-400 text-xs px-2.5 py-0.5 rounded-full border border-purple-500/20">
          {messages.length} Messages
        </span>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-20 bg-[#0a0f16] border border-gray-800 rounded-xl">
            <p className="text-gray-500">No new messages.</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={msg.id || idx} className="bg-[#0a0f16] border border-gray-800 p-5 rounded-xl hover:border-gray-700 transition-colors flex flex-col md:flex-row gap-4 md:items-start group">
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {msg.name ? msg.name.charAt(0).toUpperCase() : "?"}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-white font-medium">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-sm text-blue-400 hover:underline">
                      {msg.email}
                    </a>
                  </div>
                  <span className="text-xs text-gray-500">
                      {msg.date ? new Date(msg.date).toLocaleDateString() : "Recent"}
                  </span> 
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mt-2 bg-gray-900/50 p-3 rounded-lg border border-gray-800/50">
                  {msg.message}
                </p>

                <div className="flex gap-3 mt-3">
                  <button 
                    onClick={() => handleReply(msg.email, msg.name)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <FaReply /> Reply
                  </button>
                  <button 
                    onClick={() => handleDelete(msg.id)} 
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Message;