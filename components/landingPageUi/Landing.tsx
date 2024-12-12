"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/landingPageUi/Hero";
import About from "@/components/landingPageUi/About";
import SignIn from "@/components/layouts/SignIn";
import Skills from "@/components/landingPageUi/Skills";
import ContactMe from "@/components/landingPageUi/ContactMe";
import ProjectArchive from "@/components/landingPageUi/ProjectArchive";
import ScrollToTop from "../ui/ScrollToTop";

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

interface ContactLink {
  id: number;
  name: string;
  image: string;
  href: string;
}

interface PageProps {
  projects: Project[];
  skills: Skill[];
  contactlinks: ContactLink[];
}

const Landing: React.FC<PageProps> = ({ projects, skills, contactlinks }) => {
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
      <ContactMe contactlinks={contactlinks} />
      <SignIn isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <ScrollToTop />
    </main>
  );
};

export default Landing;
