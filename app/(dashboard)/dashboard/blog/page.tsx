"use Client";

import React from "react";
import Link from "next/link";
import { prisma } from "@/prisma";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const page = async () => {
  const blog = await prisma.blog.findMany({
    where: {
      title: {},
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold">blog</h1>
      <Link
        href="/dashboard/blog/new"
        className="text-blue-600 hover:underline"
      >
        + New Blog
      </Link>
      <ul className="mt-4">
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link
              href={`/dashboard/blog/${blog.id}`}
              className="text-blue-600 hover:underline"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
