"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Unauthorized from "@/components/dashboardUi/Unauthorized";
import LoaderCircle from "@/components/ui/LoaderCircle";
import DashboardCard from "@/components/dashboardUi/DashboardCard";

// Define the interfaces for data types
interface Project {
  id: number;
  title: string;
}

interface Blog {
  id: number;
  title: string;
}

interface Skill {
  id: number;
  name: string;
}

interface DashboardProps {
  projects: Project[];
  blogs: Blog[];
  skills: Skill[];
}

const Dashboard: React.FC<DashboardProps> = ({ projects, blogs, skills }) => {
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
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome, {user?.name}!</p>

      {/* Pass projects, blogs, and skills to DashboardCard */}
      <DashboardCard projects={projects} blogs={blogs} skills={skills} />
    </div>
  );
};

export default Dashboard;
