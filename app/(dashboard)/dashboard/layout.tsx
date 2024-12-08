"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/dashboardUi/Sidbar";
import Header from "@/components/layouts/Header";
import Loading from "@/components/ui/Loading";
import Unauthorized from "@/components/dashboardUi/Unauthorized";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (!session || !session.user) {
    return <Unauthorized />;
  }

  const { user } = session;

  return (
    <>
      <Header />
      <main className="w-full container flex mx-auto">
        <Sidebar user={user} />
        <div className="flex-1 ml-5 border rounded-lg p-2">
        {children}
        </div>
      </main>
    </>
  );
}
