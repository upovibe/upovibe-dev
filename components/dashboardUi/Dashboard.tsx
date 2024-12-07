import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Session } from "next-auth";
import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  User,
  Settings,
  PanelRightClose,
  PanelLeftClose,
  FolderGit2,
  FilePenLine,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardProps {
  user: Session["user"];
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Project", icon: FolderGit2, href: "/dashboard/project" },
  { label: "Blog", icon: FilePenLine, href: "/dashboard/blog" },
  { label: "Settings", icon: Settings, href: "/" },
];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    toast.success("Signed out successfully!");
  };

  return (
    <div className="w-full container flex">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-14" : "w-64"
        } flex flex-col justify-between p-2 border relative transition-all duration-300 ease-in-out rounded-lg gap-10`}
      >
        <ul className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-2 p-2 hover:bg-gray-200 transition-all duration-200 ease-linear rounded-lg"
            >
              <item.icon className="text-2xl flex-shrink-0" />
              <span
                className={`text-base whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  collapsed ? "" : "w-auto"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </ul>
        <div className="flex flex-col gap-2">
          <Link
            href="/profile"
            className="flex items-center gap-2 p-2 hover:bg-gray-200 transition-all duration-200 ease-linear rounded-lg"
          >
            {user?.image && (
              <>
                <Avatar className="size-6">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </>
            )}
            <span
              className={`text-base whitespace-nowrap overflow-hidden transition-all duration-300 ${
                collapsed ? "" : "w-auto"
              }`}
            >
              Profile
            </span>
          </Link>
          <Button
            onClick={handleSignOut}
            className="flex items-center gap-2 p-2 hover:bg-red-600 transition-all duration-200 ease-linear rounded-lg w-full justify-start"
          >
            <LogOut className={`text-2xl flex-shrink-0`} />
            <span
              className={`text-base whitespace-nowrap overflow-hidden transition-all duration-300 ${
                collapsed ? "" : "w-auto"
              }`}
            >
              Logout
            </span>
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-0 size-7 p-2 hover:bg-gray-200 transition-all duration-300 z-50"
        >
          {collapsed ? <PanelLeftClose /> : <PanelRightClose />}
        </Button>
      </aside>

      {/* Content */}
      <div className="flex-1 ml-5 border rounded-lg p-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Welcome, {user?.name}!</p>
      </div>
    </div>
  );
};

export default Dashboard;
