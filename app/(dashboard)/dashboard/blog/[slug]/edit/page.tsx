import React from "react";
import { prisma } from "@/prisma";
import {
  Breadcrumb,
  BreadcrumbItem,
  // BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Tag } from "lucide-react";
import FormLayout from "@/components/dashboardUi/FormLayout";
import { editBlog } from "@/app/api/crude/formActions";

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

  if (!blog || !blog.id) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
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
            <Link href="/dashboard/blog">blog</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/dashboard/blog/${blog.slug}`}>
              {blog.slug}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Tag className="size-5" />
          Edit {blog.slug}
        </h1>
        <FormLayout
          fields={["title", "description", "image"]}
          labels={{
            title: "Blog Name",
            description: "Blog Description",
            image: "Image",
          }}
          onSubmit={editBlog}
          additionalSubmitArgs={[blog.id]}
          initialData={{
            title: blog.title,
            description: blog.description,
          }}
          successRedirect={"/dashboard/blog"}
        />
      </div>
    </div>
  );
};

export default page;
