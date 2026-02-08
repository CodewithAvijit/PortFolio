import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

const Contact = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 py-20">
        <div className="max-w-xl mx-auto bg-gray-950 border border-gray-800 rounded-2xl p-8">
          <h1 className="text-4xl font-extrabold mb-6 text-center">
            Contact Me
          </h1>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />

            <Button text="Send Message" />
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
