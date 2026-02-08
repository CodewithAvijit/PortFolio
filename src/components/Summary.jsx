import React from "react";

const Summary = () => {
  return (
    <section className="bg-gray-950 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

        <div className="p-6 border border-gray-800 rounded-xl">
          <h2 className="text-3xl font-bold text-blue-500">10+</h2>
          <p className="text-gray-400 mt-2">Projects Built</p>
        </div>

        <div className="p-6 border border-gray-800 rounded-xl">
          <h2 className="text-3xl font-bold text-blue-500">CSE</h2>
          <p className="text-gray-400 mt-2">B.Tech Student</p>
        </div>

        <div className="p-6 border border-gray-800 rounded-xl">
          <h2 className="text-3xl font-bold text-blue-500">AI</h2>
          <p className="text-gray-400 mt-2">ML & LLM Focus</p>
        </div>

      </div>
    </section>
  );
};

export default Summary;
