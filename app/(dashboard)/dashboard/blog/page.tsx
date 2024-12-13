import React from "react";
import Link from "next/link";
import { prisma } from "@/prisma";
import TableLayout from "@/components/dashboardUi/TableLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FilePenLine } from "lucide-react";

const page = async () => {
  // Fetch blog data from Prisma
  const blog = await prisma.blog.findMany();

  // Delete row handler
  const deleteRow = async (id: number) => {
    "use server";
    await prisma.blog.delete({ where: { id } });
  };

  // Transform the blog data to match the expected format for TableLayout
  const transformedBlog = blog.map(item => ({
    id: item.id,
    name: item.title,
    slug: item.slug,   
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
            <BreadcrumbPage>Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FilePenLine className="size-5" />
        Blogs
      </h1>
      <TableLayout data={transformedBlog} title="Blog" deleteRow={deleteRow} />
    </div>
  );
};

export default page;
