"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Unauthorized from "@/components/dashboardUi/Unauthorized";
import LoaderCircle from "@/components/ui/LoaderCircle";
import SettingsCard from "@/components/dashboardUi/SettingsCard";

interface Contact {
  id: number;
  name: string;
}

interface SettingsProps {
  contacts: Contact[];
}

const Settings: React.FC<SettingsProps> = ({ contacts }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoaderCircle />;
  }

  if (!session) {
    return <Unauthorized />;
  }

  const { user } = session;

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="mb-6 text-gray-700">
        Manage your account and view key information here. Welcome, {user?.name}!
      </p>

      {/* Display Contacts Overview */}
      <SettingsCard contacts={contacts} />

    </div>
  );
};

export default Settings;
