"use client";

import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Tag } from "lucide-react";
import FormLayout from "@/components/dashboardUi/FormLayout";
import { editCategory } from "@/app/actions/formActions";

interface EditCategoryPageProps {
  category: {
    id: number;
    name: string;
    description: string;
    slug: string;
    image?: string;
  };
}

const EditCategoryPage: React.FC<EditCategoryPageProps> = ({ category }) => {
  const handleEditCategory = async (formData: FormData) => {
    try {
      const result = await editCategory(formData, category.id.toString());
      if (result.success) {
        alert("Category edited successfully");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error editing category:", error);
    }
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
            <Link href="/dashboard/category">Category</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/dashboard/category/${category.slug}`}>
              {category.slug}
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
          Edit {category.slug}
        </h1>
        <FormLayout
          titleLabel="Category Name"
          descriptionLabel="Category Description"
          imageLabel="Category Image"
          categoryLabel="Parent Category"
          onSubmit={handleEditCategory}
          initialData={{
            name: category.name,
            description: category.description,
            image: category.image,
          }}
        />
      </div>
    </div>
  );
};

export default EditCategoryPage;
