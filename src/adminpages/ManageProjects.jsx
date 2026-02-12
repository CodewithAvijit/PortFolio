import React, { useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus, FaTimes, FaLink, FaGithub } from "react-icons/fa";

const ManageProjects = ({ projects, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    codelink: "",
    livelink: "",
    skillNames: ""
  });


  const openCreateModal = () => {
    setIsEditMode(false);
    setCurrentId(null);
    setFormData({ title: "", description: "", codelink: "", livelink: "", skillNames: "" });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setIsEditMode(true);
    setCurrentId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      codelink: project.codelink || "",
      livelink: project.livelink || "",
      skillNames: "" 
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      if (isEditMode) {
        const updatePayload = {
          codelink: formData.codelink,
          livelink: formData.livelink
        };
        
        await axios.put(`https://portfolio-backend-t56b.onrender.com/projects/${currentId}`, updatePayload, authConfig);
      
      } else {
        const createPayload = {
          title: formData.title,
          description: formData.description,
          codelink: formData.codelink,
          livelink: formData.livelink,
          skillNames: formData.skillNames.split(',').map(s => s.trim()).filter(s => s.length > 0)
        };

        await axios.post("https://portfolio-backend-t56b.onrender.com/projects", createPayload, authConfig);
      }

      setIsModalOpen(false);
      if (onRefresh) onRefresh();

    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to save project. Check connection or permissions.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const token = localStorage.getItem("token");
      const authConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.delete(`https://portfolio-backend-t56b.onrender.com/projects/${id}`, authConfig);
      
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project. You might not be authorized.");
    }
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">All Projects</h2>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <FaPlus size={12} /> Add New
        </button>
      </div>

      <div className="bg-[#0a0f16] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b border-gray-800">Title</th>
                <th className="p-4 border-b border-gray-800">Description</th>
                <th className="p-4 border-b border-gray-800">Links</th>
                <th className="p-4 border-b border-gray-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm divide-y divide-gray-800">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    No projects found. Start by adding one.
                  </td>
                </tr>
              ) : (
                projects.map((proj, idx) => (
                  <tr key={idx} className="hover:bg-gray-900/40 transition-colors">
                    <td className="p-4 font-medium text-white">{proj.title || "Untitled"}</td>
                    <td className="p-4 max-w-xs truncate text-gray-400">
                      {proj.description || "No description provided."}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 text-lg">
                        {proj.codelink && (
                          <a href={proj.codelink} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                            <FaGithub />
                          </a>
                        )}
                        {proj.livelink && (
                          <a href={proj.livelink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
                            <FaLink />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => openEditModal(proj)} 
                          className="text-gray-400 hover:text-white transition"
                          title="Edit Links"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(proj.id)}
                          className="text-gray-400 hover:text-red-400 transition"
                          title="Delete Project"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0a0f16] border border-gray-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative overflow-y-auto max-h-[90vh]">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">
              {isEditMode ? "Edit Project Links" : "Add New Project"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Project Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  disabled={isEditMode}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="My Awesome App"
                  required={!isEditMode}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea 
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  disabled={isEditMode}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                  placeholder="What does it do?"
                  required={!isEditMode}
                />
              </div>

              {!isEditMode && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Skills (Comma Separated)</label>
                  <input 
                    type="text" 
                    value={formData.skillNames}
                    onChange={(e) => setFormData({...formData, skillNames: e.target.value})}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="React, Java, Spring Boot"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Code Link</label>
                  <div className="relative">
                    <FaGithub className="absolute left-3 top-3.5 text-gray-500" />
                    <input 
                      type="url" 
                      value={formData.codelink}
                      onChange={(e) => setFormData({...formData, codelink: e.target.value})}
                      className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Live Link</label>
                  <div className="relative">
                    <FaLink className="absolute left-3 top-3.5 text-gray-500" />
                    <input 
                      type="url" 
                      value={formData.livelink}
                      onChange={(e) => setFormData({...formData, livelink: e.target.value})}
                      className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="https://myapp.com"
                    />
                  </div>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition font-medium disabled:opacity-50">{loading ? "Saving..." : "Save Project"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;