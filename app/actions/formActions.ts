"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

// Create category function
export const createCategory = async (formData: FormData) => {
  const name = formData.get("name") as string;

  if (!name) {
    throw new Error("Name is required");
  }

  try {
    await prisma.category.create({
      data: {
        name,
        slug: name.replace(/\s+/g, "_").toLowerCase(),
      },
    });

    revalidatePath("/dashboard/category/new");

    return { success: true };
  } catch (error) {
    console.error("Error creating category:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};

// Edit category function
export const editCategory = async (formData: FormData, id: string) => {
  const name = formData.get("name") as string;

  if (!name) {
    throw new Error("Name is required");
  }

  try {
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      throw new Error("Invalid category ID");
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parsedId },
      data: {
        name,
        slug: name.replace(/\s+/g, "_").toLowerCase(),
      },
    });

    return { success: true, category: updatedCategory };
  } catch (error) {
    console.error("Error editing category:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};

// Delete category function
export const deleteCategory = async (id: string) => {
  try {
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      throw new Error("Invalid category ID");
    }

    await prisma.category.delete({ where: { id: parsedId } });

    revalidatePath("/dashboard/category");

    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};
