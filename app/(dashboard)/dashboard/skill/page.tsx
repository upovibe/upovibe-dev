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
import { FolderGit2 } from "lucide-react";

const page = async () => {
  const skill = await prisma.skill.findMany();

  const deleteRow = async (id: number) => {
    "use server";
    await prisma.skill.delete({ where: { id } });
  };

  // Transform the skill data to match the expected format
  const transformedSkill = skill.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.name.toLowerCase().replace(/\s+/g, '-'),
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
            <BreadcrumbPage>skill</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FolderGit2 className="size-5" />
        skills
      </h1>
      <TableLayout
        data={transformedSkill}
        title="skill"
        deleteRow={deleteRow}
      />
    </div>
  );
};

export default page;
