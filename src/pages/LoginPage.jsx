import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ MOCK CHECK (frontend only)
    if (email && password) {
      navigate("/admin"); // REAL navigation
    } else {
      alert("Enter email and password");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="bg-gray-950 border border-gray-800 rounded-2xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
