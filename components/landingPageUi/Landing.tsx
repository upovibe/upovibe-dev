"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/landingPageUi/Hero";
import About from "@/components/landingPageUi/About";
import SignIn from "@/components/layouts/SignIn";
import Skills from "@/components/landingPageUi/Skills";
import Contact from "@/components/landingPageUi/Contact";
import ProjectArchive from "@/components/landingPageUi/ProjectArchive";

interface Project {
  id: number;
  title: string;
  image: string;
}

interface Skill {
  id: string;
  name: string;
  image: string;
  score: number;
}

interface PageProps {
  projects: Project[];
  skills: Skill[];
}

const Landing: React.FC<PageProps> = ({ projects, skills }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "u") {
      event.preventDefault();
      setModalOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <About />
      <Skills skills={skills} />
      <ProjectArchive projects={projects} />
      <Contact/>
      <SignIn isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Landing;
