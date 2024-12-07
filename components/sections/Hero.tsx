"use client";

import React from "react";
import Lottie from "lottie-react";
import heroAnimation from "@/public/animations/Hero-Animation.json";

function Hero() {
  return (
    <div className="bg-black/30 border-b w-full container flex flex-col lg:flex-row items-center justify-between py-8 px-6">
      {/* Left Side (Text Content) */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase mb-2">
          Fullstack Developer
        </h3>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 lg:text-4xl">
          Promise Uzor Okwudiri
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Crafting impactful web solutions with modern technologies. Ready to collaborate, innovate, and grow with forward-thinking teams.
        </p>
      </div>

      {/* Right Side (Lottie Animation) */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <Lottie 
          animationData={heroAnimation} 
          loop 
          className="w-64 h-64 lg:w-80 lg:h-80"
        />
      </div>
    </div>
  );
}

export default Hero;
