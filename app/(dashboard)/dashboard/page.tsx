"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/Loading";
import Unauthorized from "@/components/dashboardUi/Unauthorized";
import Dashboard from "@/components/dashboardUi/Dashboard";

const DashboardPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return <Unauthorized />;
  }

  const { user } = session;

  return (
    <main className="flex flex-col items-center justify-center">
      <Dashboard user={user} />
    </main>
  );
};

export default DashboardPage;

