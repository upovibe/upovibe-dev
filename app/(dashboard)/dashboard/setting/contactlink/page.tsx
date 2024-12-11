import React from "react";
import Link from "next/link";
import { prisma } from "@/prisma";
import TableLayout from "@/components/dashboardUi/TableLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  // BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Contact } from "lucide-react";

const page = async () => {
  const contactLink = await prisma.contactLink.findMany();

  const deleteRow = async (id: number) => {
    "use server";
    await prisma.contactLink.delete({ where: { id } });
  };

  return (
    <div>
      <Breadcrumb className="border px-1 rounded-md mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contact links</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Contact className="size-5" />
        My Contact links
      </h1>
      <TableLayout
        data={contactLink}
        title="contactLink"
        deleteRow={deleteRow}
        baseUrl="/dashboard/setting/contactlink"
      />
    </div>
  );
};

export default page;
