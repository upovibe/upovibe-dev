import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  // BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { FilePenLine } from "lucide-react";
import { createBlog } from "@/app/api/crude/formActions";
import FormLayout from "@/components/dashboardUi/FormLayout";

const page = () => {
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
          <BreadcrumbPage>Add new</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FilePenLine className="size-5" />
          Add new blog
        </h1>
        <FormLayout
          fields={["title", "description", "image"]}
          labels={{
            title: "Blog Name",
            description: "Blog Description",
            image: "Image",
          }}
          onSubmit={createBlog}
          initialData={{}}
          successRedirect={"/dashboard/blog"}
        />
      </div>
    </div>
  );
};

export default page;
