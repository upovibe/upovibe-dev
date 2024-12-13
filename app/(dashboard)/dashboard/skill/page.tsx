import React from "react";
import Link from "next/link";
import { prisma } from "@/prisma";
import {
  Breadcrumb,
  BreadcrumbItem,
  // BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Lightbulb } from "lucide-react";
import TableLayout from "@/components/dashboardUi/TableLayout";

const page = async () => {
  const skill = await prisma.skill.findMany();

  const deleteRow = async (id: number) => {
    "use server";
    await prisma.skill.delete({ where: { id } });
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
            <BreadcrumbPage>Skill</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Lightbulb className="size-5" />
        Skills
      </h1>
      <TableLayout
        data={skill}
        title="skill"
        deleteRow={deleteRow}
      />
    </div>
  );
};
 
export default page;
