import React, { useState } from "react";
import axios from "axios";
import { FaTrash, FaPlus, FaEdit, FaTimes } from "react-icons/fa";

const ManageSkills = ({ skills, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null); 
  const [skillName, setSkillName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const openModal = (skill = null) => {
    setCurrentSkill(skill);
    setSkillName(skill ? skill.skill : ""); 
    setError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const authConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      };

      if (currentSkill) {

        await axios.put(`https://portfolio-backend-t56b.onrender.com/skills/${currentSkill.id}`, {
          skill: skillName
        }, authConfig);
      
      } else {
        await axios.post("https://portfolio-backend-t56b.onrender.com/skills", {
          skill: skillName
        }, authConfig);
      }
      
      setIsModalOpen(false);
      setSkillName("");
      if (onRefresh) onRefresh(); 

    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to save skill. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      const token = localStorage.getItem("token");
      const authConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.delete(`https://portfolio-backend-t56b.onrender.com/skills/${id}`, authConfig);
      
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete skill. Check permissions.");
    }
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Skill Set</h2>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <FaPlus size={12} /> Add Skill
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.map((skillItem, idx) => (
          <div 
            key={skillItem.id || idx} 
            className="group relative bg-[#0a0f16] border border-gray-800 hover:border-green-500/50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300"
          >
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => openModal(skillItem)} 
                className="text-gray-500 hover:text-blue-400"
              >
                <FaEdit size={12} />
              </button>
              <button 
                onClick={() => handleDelete(skillItem.id)} 
                className="text-gray-500 hover:text-red-500"
              >
                <FaTrash size={12} />
              </button>
            </div>

            <span className="font-semibold text-gray-200 group-hover:text-white text-center">
               {skillItem.skill}
            </span>
            <span className="text-[10px] bg-gray-900 text-gray-500 px-2 py-0.5 rounded border border-gray-800">
              ID: {skillItem.id}
            </span>
          </div>
        ))}
        
        <button 
          onClick={() => openModal()}
          className="border border-dashed border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-green-500 hover:border-green-500/30 hover:bg-green-500/5 transition-all"
        >
          <FaPlus size={20} />
          <span className="text-sm font-medium">New Skill</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0a0f16] border border-gray-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">
              {currentSkill ? "Edit Skill" : "Add New Skill"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Skill Name</label>
                <input 
                  type="text" 
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="e.g. React, Python..."
                  autoFocus
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition font-medium disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Skill"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSkills;