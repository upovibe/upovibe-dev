// components/dashboardUi/Dashboard.tsx
import React from "react";
import Aside from "./Aside";
import Profile from "./Profile";

interface DashboardProps {
  user: any;
}

const Dashboard = ({ user }: DashboardProps) => {
  return (
    <div className="flex items-center justify-center container px-6">
      <Aside />
      <Profile user={user} />
    </div>
  );
};

export default Dashboard;
