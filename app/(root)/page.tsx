import React from "react";
import { fetchLatestProjects, fetchSkills, fetchContact } from "@/lib/data";
import Landing from "@/components/landingPageUi/Landing";

const Page = async () => {
  const projects = await fetchLatestProjects();
  const skills = await fetchSkills();
  const contactlinks = await fetchContact();

  return <Landing projects={projects} skills={skills} contactlinks={contactlinks}  />;
};

export default Page;
