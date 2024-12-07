// components/dashboardUi/Dashboard.tsx
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Session } from "next-auth";

interface DashboardProps {
  user: Session['user'];
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    toast.success("Signed out successfully!");
  };

  return (
    <div className="bg-black/30 border-b w-full container flex flex-col lg:flex-row items-center justify-between py-8 px-6">
      <div className="flex flex-col md:flex-row space-x-6">
        {/* Aside component (sidebar) */}
        <aside className="flex-none w-full md:w-1/4 p-6 bg-gray-800 text-white">
          <h2 className="text-2xl font-bold mb-4">Aside</h2>
          {/* You can add any sidebar content here */}
          <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
          </ul>
        </aside>

        {/* Profile component */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-4 text-lg">Welcome, {user?.name}!</p>
          {user?.image && (
            <Image
              src={user.image}
              alt={`${user.name}'s profile`}
              width={200}
              height={200}
              className="mt-4 w-20 h-20 rounded-full"
            />
          )}
          <Button
            onClick={handleSignOut}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-200 ease-linear"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
