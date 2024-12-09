"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Hero() {
  return (
    <div className="h-[40vh] border-b w-full container flex flex-col lg:flex-row items-center justify-between py-8 px-6">
      {/* Left Side (Text Content) */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase mb-2">
          Fullstack Developer
        </h3>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 lg:text-4xl">
          Promise Uzor Okwudiri
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Crafting impactful web solutions with modern technologies. Ready to
          collaborate, innovate, and grow with forward-thinking teams.
        </p>
      </div>

      {/* Right Side (Lottie Animation) */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <DotLottieReact
          src="https://lottie.host/056d4b53-2195-4a1e-b4b1-9269f09b6506/NGOOsDFLR9.json"
          loop
          autoplay
        />
      </div>
    </div>
  );
}

export default Hero;
