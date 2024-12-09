"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

// ------------------Category ----------------

// Create category function
export const createCategory = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string || "Default description";

  if (!title) {
    throw new Error("title is required");
  }

  try {
    await prisma.category.create({
      data: {
        title,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        description,
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
  const title = formData.get("title") as string;

  if (!title) {
    throw new Error("title is required");
  }

  try {
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      throw new Error("Invalid category ID");
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parsedId },
      data: {
        title,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
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


// ---------------- Project ----------------

// Create a new project

export const createProject = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string || "Default description";
  const image = formData.get("image") as string | null;
  const categories = formData.getAll("categories") as string[];

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  try {
    await prisma.project.create({
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image,
        categories: {
          connect: categories.map((id) => ({ id: parseInt(id) })),
        },
      },
    });

    revalidatePath("/dashboard/project/new");

    return { success: true };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};


// Edit an existing project

export const editProject = async (formData: FormData, id: string) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string | null;
  const categories = formData.getAll("categories") as string[];

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  try {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) throw new Error("Invalid project ID");

    const updatedProject = await prisma.project.update({
      where: { id: parsedId },
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image,
        categories: {
          set: categories.map((id) => ({ id: parseInt(id) })), // Replace existing associations
        },
      },
    });

    return { success: true, project: updatedProject };
  } catch (error) {
    console.error("Error editing project:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

// Delete a project

export const deleteProject = async (id: string) => {
  try {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) throw new Error("Invalid project ID");

    await prisma.project.delete({ where: { id: parsedId } });

    revalidatePath("/dashboard/project");

    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};


// ----------------Blog---------------------------

// Create a blog 

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string || "Default description";
  const image = formData.get("image") as string | null;
  const categories = formData.getAll("categories") as string[];

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  try {
    await prisma.blog.create({
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image,
        categories: {
          connect: categories.map((id) => ({ id: parseInt(id) })),
        },
      },
    });

    revalidatePath("/dashboard/blog/new");

    return { success: true };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};


// Edit a blog

export const editBlog = async (formData: FormData, id: string) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string | null;
  const categories = formData.getAll("categories") as string[];

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  try {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) throw new Error("Invalid blog ID");

    const updatedBlog = await prisma.blog.update({
      where: { id: parsedId },
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image,
        categories: {
          set: categories.map((id) => ({ id: parseInt(id) })),
        },
      },
    });

    return { success: true, blog: updatedBlog };
  } catch (error) {
    console.error("Error editing blog:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

// Delete a blog

export const deleteBlog = async (id: string) => {
  try {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) throw new Error("Invalid blog ID");

    await prisma.blog.delete({ where: { id: parsedId } });

    revalidatePath("/dashboard/blog");

    return { success: true };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};