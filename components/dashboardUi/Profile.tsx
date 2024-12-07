// components/Profile.tsx
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Session } from "next-auth";

interface ProfileProps {
  user: Session['user'];
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    toast.success("Signed out successfully!");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
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
  );
};

export default Profile;
