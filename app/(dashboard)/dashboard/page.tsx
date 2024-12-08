"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/Loading";
import Unauthorized from "@/components/dashboardUi/Unauthorized";

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
      <div className="">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Welcome, {user?.name}!</p>
      </div>
  );
};

export default DashboardPage;
