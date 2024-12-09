import React from "react";
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
import { deleteCategory } from "@/app/api/crude/formActions";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const category = await prisma.category.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!category) {
    return (
      <div>
        <h1 className="text-  font-bold">Category Not Found</h1>
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
            <Link href="/dashboard/category">Category</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Tag className="size-5" />
          {category.title}
        </h1>
        <div className="flex flex-col w-full gap-5">
          <p className="border px-2 rounded-md">{category.description}</p>
          <div className="flex items-center justify-end gap-2 w-full">
            <Button className="bg-slate-400 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-white duration-200 ease-linear ">
              <Link href={`/dashboard/category/${category.slug}/edit`}>
                Edit
              </Link>
            </Button>
            <DeleteButton
              action={deleteCategory}
              args={[category.id]}
              buttonText="Delete"
              successRedirect="/dashboard/category"
              errorMessage="Error deleting category"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
