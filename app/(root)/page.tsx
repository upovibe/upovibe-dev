"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/pageUi/Hero";
import About from "@/components/pageUi/About";
import SignIn from "@/components/layouts/SignIn";

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
    <main className="flex flex-col items-center justify-center bg-green-600">
      <Hero />
      <About />
      <SignIn isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Page;
