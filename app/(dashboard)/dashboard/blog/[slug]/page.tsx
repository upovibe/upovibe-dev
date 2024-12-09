import React from "react";
import Image from "next/image";
import { prisma } from "@/prisma";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Tag } from "lucide-react";
import DeleteButton from "@/components/dashboardUi/DeleteButton";
import { deleteProject } from "@/app/api/crude/formActions";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const blog = await prisma.blog.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!blog) {
    return (
      <div>
        <h1 className="text-  font-bold">Blog Not Found</h1>
      </div>
    );
  }

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
            <Link href="/dashboard/blog">Blog</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{blog.slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col w-full gap-3 border p-2 rounded-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2 capitalize">
          <Tag className="size-5" />
          {blog.title}
        </h1>
        {/* Image Section */}
        {blog.image && (
          <div className="w-full h-64 relative overflow-hidden rounded-lg border">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <p className="text-gray-600">{blog.description}</p>
        <div className="w-full flex items-center gap-2 justify-end">
          <Button className="bg-slate-400 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-white duration-200 ease-linear ">
            <Link href={`/dashboard/blog/${blog.slug}/edit`}>Edit</Link>
          </Button>
          <DeleteButton
            action={deleteProject}
            args={[blog.id]}
            buttonText="Delete"
            successRedirect="/dashboard/blog"
            errorMessage="Error deleting blog"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
