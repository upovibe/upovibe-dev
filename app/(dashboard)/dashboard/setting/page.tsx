import React from "react";
import { fetchContact } from "@/lib/data";
import Settings from "@/components/dashboardUi/Settings";

// Fetch data from the database
const page = async () => {
  const contacts = await fetchContact();

  return <Settings contacts={contacts} />;
};

export default page;
