import React from "react";
import { prisma } from "@/prisma";
import ProjectsList from "@/components/landingPageUi/ProjectsList"; // Import your Client Component

// This function will run on the server and fetch the projects
const ProjectsPage = async () => {
  const projects = await prisma.project.findMany(); // Server-side data fetching
  return <ProjectsList projects={projects} />;
};

export default ProjectsPage;
