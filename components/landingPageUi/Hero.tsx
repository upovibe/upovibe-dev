"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

function Hero() {
  // Animation variants for the text and animation
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const animationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <motion.div
      id="hero"
      initial="hidden"
      animate="visible"
      className="h-screen border-b border-gray-200/20 w-full container flex flex-col lg:flex-row items-center justify-between py-52 px-6"
    >
      {/* Left Side (Text Content) */}
      <motion.div
        className="w-full lg:w-1/2 text-center lg:text-left"
        variants={textVariants}
      >
        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
          Fullstack Developer
        </h3>
        <h1 className="text-3xl font-extrabold text-white mb-4 lg:text-4xl">
          Promise Uzor Okwudiri
        </h1>
        <p className="text-lg text-gray-300">
          Crafting impactful web solutions with modern technologies. Ready to
          collaborate, innovate, and grow with forward-thinking teams.
        </p>
      </motion.div>

      {/* Right Side (Lottie Animation) */}
      <motion.div
        className="w-full lg:w-1/2 flex justify-center items-center"
        variants={animationVariants}
      >
        <DotLottieReact
          src="https://lottie.host/056d4b53-2195-4a1e-b4b1-9269f09b6506/NGOOsDFLR9.json"
          loop
          autoplay
        />
      </motion.div>
    </motion.div>
  );
}

export default Hero;
