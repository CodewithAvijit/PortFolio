import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Summary from "../components/Summary";
import Footer from "../components/Footer";
import ProfileCard from "../components/Profile";

const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      {/* HERO + PROFILE */}
      <main className="flex-grow px-6 py-20">
        <div className="
          max-w-6xl mx-auto
          flex flex-col-reverse md:flex-row
          items-center
          gap-12
        ">
          {/* Hero */}
          <div className="flex-1">
            <Hero />
          </div>

          {/* Profile Card */}
          <div className="flex-1 flex justify-center md:justify-end">
            <ProfileCard />
          </div>
        </div>
      </main>

      <Summary />
      <Footer />
    </div>
  );
};

export default Home;
