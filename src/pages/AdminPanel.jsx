import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaProjectDiagram, 
  FaEnvelope, 
  FaCode, 
  FaSignOutAlt, 
  FaTachometerAlt, 
  FaBars, 
  FaTimes,
  FaUserCircle 
} from "react-icons/fa";

import DashBoard from "../adminpages/DashBoard";
import ManageProjects from "../adminpages/ManageProjects";
import ManageSkills from "../adminpages/ManageSkills";
import Message from "../adminpages/Message";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    projects: [],
    messages: [],
    skills: []
  });

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem("token");
      const authConfig = { headers: { Authorization: `Bearer ${token}` } };

      const [projectsRes, contactsRes, skillsRes] = await Promise.all([
        axios.get("https://portfolio-backend-t56b.onrender.com/projects"),
        axios.get("https://portfolio-backend-t56b.onrender.com/contacts", authConfig),
        axios.get("https://portfolio-backend-t56b.onrender.com/skills"),
      ]);

      setData({
        projects: projectsRes.data,
        messages: contactsRes.data,
        skills: skillsRes.data,
      });
    } catch (error) {
      console.error("Data fetch error:", error);
      if (error.response && error.response.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // --- Sidebar Button Component ---
  const NavButton = ({ tab, icon: Icon, label }) => (
    <button 
      onClick={() => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
      }}
      className={`relative flex items-center gap-4 w-full px-5 py-3.5 rounded-xl transition-all duration-300 font-medium group ${
        activeTab === tab 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 translate-x-1" 
          : "text-gray-400 hover:bg-gray-900 hover:text-white hover:translate-x-1"
      }`}
    >
      <Icon className={`text-xl ${activeTab === tab ? "text-white" : "text-gray-500 group-hover:text-white"}`} />
      <span>{label}</span>
      
      {activeTab === tab && (
        <span className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white/80" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white flex font-sans selection:bg-blue-500/30">
      
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-6 z-50">
        <h2 className="text-xl font-bold tracking-tight">Admin<span className="text-blue-500">.</span></h2>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition"
        >
          {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-72 bg-[#050505] border-r border-gray-800/50 z-50 
        flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="h-24 flex items-center px-8 border-b border-gray-800/30">
          <h2 className="text-2xl font-bold tracking-wide text-white">
            Admin<span className="text-blue-500">Panel</span>
          </h2>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu</p>
          <NavButton tab="dashboard" icon={FaTachometerAlt} label="Dashboard" />
          <NavButton tab="projects" icon={FaProjectDiagram} label="Projects" />
          <NavButton tab="messages" icon={FaEnvelope} label="Messages" />
          <NavButton tab="skills" icon={FaCode} label="Skills" />
        </nav>

        <div className="p-4 border-t border-gray-800/30 bg-gray-900/20">
          
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 rounded-lg transition-all duration-200"
          >
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 bg-black min-h-screen">
        <div className="p-6 md:p-12 pt-24 md:pt-12 max-w-7xl mx-auto w-full">
          
          <div className="hidden md:flex justify-between items-end mb-8 pb-4 border-b border-gray-800">
            <div>
              <h1 className="text-3xl font-bold capitalize text-white">{activeTab}</h1>
              <p className="text-gray-500 mt-1 text-sm">Manage your portfolio content efficiently</p>
            </div>
            <div className="flex gap-2">
               {/* Optional: Add global action buttons here */}
            </div>
          </div>

          <div className="animate-fade-in">
            {activeTab === "dashboard" && (
               <DashBoard 
                 projects={data.projects} 
                 messages={data.messages} 
                 skills={data.skills} 
                 loading={loading}
               />
            )}

            {activeTab === "projects" && (
              <ManageProjects 
                projects={data.projects} 
                onRefresh={fetchAllData} 
              />
            )}

            {activeTab === "messages" && (
               <Message 
                 messages={data.messages} 
                 onRefresh={fetchAllData}
               />
            )}

            {activeTab === "skills" && (
               <ManageSkills 
                 skills={data.skills} 
                 onRefresh={fetchAllData}
               />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;