import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;