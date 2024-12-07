"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import pageLoading from "@/public/animations/PageLoading.json";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="w-full flex justify-center items-center">
        <Lottie
          animationData={pageLoading}
          loop
          className="size-20"
        />
      </div>
    );
  }

  if (!session) {
    return (
      <main className="w-full flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p className="mt-4 text-lg">You need to sign in to view this page.</p>
      </main>
    );
  }

  const { user } = session;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    toast.success("Signed out successfully!");
  };

  return (
    <main className="w-full flex flex-col items-center justify-center">
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
      <button
        onClick={handleSignOut}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-200 ease-linear"
      >
        Sign Out
      </button>
    </main>
  );
};

export default Dashboard;
