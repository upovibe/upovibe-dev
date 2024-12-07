"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SignIn from "@/components/sections/SignIn";

const Page = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      setModalOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <Hero />
      <About />
      <SignIn isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Page;
