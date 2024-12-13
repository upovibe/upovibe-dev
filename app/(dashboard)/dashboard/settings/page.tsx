import React from "react";
import { fetchContact, fetchSkills } from "@/lib/data";
import Settings from "@/components/dashboardUi/Settings";

// Fetch data from the database
const page = async () => {
  const contacts = await fetchContact();
  const skills = await fetchSkills();

  return <Settings contacts={contacts} skills={skills} />;
};

export default page;
