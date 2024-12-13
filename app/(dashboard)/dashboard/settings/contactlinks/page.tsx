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
import { Share2 } from "lucide-react";

const page = async () => {
  const contactLink = await prisma.contactLink.findMany();

  const deleteRow = async (id: number) => {
    "use server";
    await prisma.contactLink.delete({ where: { id } });
  };

  // Transform the contactLink data to match the expected format
  const transformedContactLink = contactLink.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    href: item.href,
    image: item.image,
    createdAt: item.createdAt.toLocaleString(),
    updatedAt: item.updatedAt.toLocaleString(),
  }));

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
            <Link href="/dashboard/settings">Settings</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>contactLink</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Share2 className="size-5" />
            My Contact Links
      </h1>
      <TableLayout
        data={transformedContactLink}
        title="Contact Link"
        deleteRow={deleteRow}
        baseUrl="/dashboard/settings/contactlinks"
      />
    </div>
  );
};

export default page;