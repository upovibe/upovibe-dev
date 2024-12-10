import React from "react";
import { fetchLatestProjects } from "@/lib/data";
import Landing from "@/components/landingPageUi/Landing";

const Page = async () => {
  const projects = await fetchLatestProjects();

  return <Landing projects={projects} />;
};

export default Page;
