import React from "react";
import { fetchLatestProjects, fetchSkills } from "@/lib/data";
import Landing from "@/components/landingPageUi/Landing";

const Page = async () => {
  const projects = await fetchLatestProjects();
  const skills = await fetchSkills();

  return <Landing projects={projects} skills={skills} />; // Pass the skills data
};

export default Page;
