import React from "react";
import { FaDownload, FaEye, FaFilePdf } from "react-icons/fa";

const ResumeCard = ({ driveLink }) => {
  const getDownloadLink = (url) => {
    return url.replace("/view", "").replace("file/d/", "uc?export=download&id=");
  };

  const downloadLink = getDownloadLink(driveLink);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 w-full h-full p-4 group">
      <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 mb-2 ring-1 ring-blue-500/30 transition-all duration-500 group-hover:ring-blue-500/60 group-hover:bg-blue-600/20">
        <FaFilePdf size={32} className="transition-transform duration-300 group-hover:scale-110" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white tracking-tight">Avijit's Resume</h3>
        <p className="text-sm text-slate-400 max-w-[220px] mx-auto leading-relaxed">
          Review my professional experience in Full-Stack Dev and AI/ML.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[280px]">
        <a 
          href={driveLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-3 rounded-xl font-medium transition-all active:scale-95"
        >
          <FaEye className="text-blue-400" /> 
          View
        </a>

        <a 
          href={downloadLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <FaDownload /> 
          Download
        </a>
      </div>
    </div>
  );
};

export default ResumeCard;