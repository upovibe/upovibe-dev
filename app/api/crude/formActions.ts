"use server";
import fs from 'fs';
import path from 'path';
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
  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const imageFile = formData.get("image") as File | null; // This is now a File object
  const categories = formData.getAll("categories") as string[];

  if (!title || !description) {
    console.error("Missing required fields: title or description");
    return { success: false, error: "Title and description are required" };
  }

  let imagePath: string | null = null;

  if (imageFile) {
    // File type validation
    if (!imageFile.type.startsWith("image/")) {
      console.error("Invalid file type. Only images are allowed.");
      return { success: false, error: "Invalid file type. Only images are allowed." };
    }

    try {
      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true }); // Ensure the directory exists
      }

      // Generate a unique name for the file
      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(uploadsDir, fileName);

      // Write the file to the uploads directory
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${fileName}`; // Relative path for public access
    } catch (err) {
      console.error("Error saving the image file:", err);
      return { success: false, error: "Failed to save image file" };
    }
  }

  try {
    await prisma.project.create({
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image: imagePath,
        categories: {
          connect: categories.map((id) => ({ id: parseInt(id) })),
        },
      },
    });

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
  const imageFile = formData.get("image") as File | null;
  const categories = formData.getAll("categories") as string[];

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  let imagePath: string | null = null;

  if (imageFile) {
    // File type validation
    if (!imageFile.type.startsWith("image/")) {
      console.error("Invalid file type. Only images are allowed.");
      return { success: false, error: "Invalid file type. Only images are allowed." };
    }

    try {
      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true }); // Ensure the directory exists
      }

      // Generate a unique name for the new file
      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(uploadsDir, fileName);

      // Write the new file to the uploads directory
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    } catch (err) {
      console.error("Error saving the new image file:", err);
      return { success: false, error: "Failed to save new image file" };
    }
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
        image: imagePath || undefined,
        categories: {
          set: categories.map((id) => ({ id: parseInt(id) })),
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
  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const imageFile = formData.get("image") as File | null; // This is now a File object
  const categories = formData.getAll("categories") as string[];

  if (!title || !description) {
    console.error("Missing required fields: title or description");
    return { success: false, error: "Title and description are required" };
  }

  let imagePath: string | null = null;

  if (imageFile) {
    // File type validation
    if (!imageFile.type.startsWith("image/")) {
      console.error("Invalid file type. Only images are allowed.");
      return { success: false, error: "Invalid file type. Only images are allowed." };
    }

    try {
      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(uploadsDir, fileName);

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    } catch (err) {
      console.error("Error saving the image file:", err);
      return { success: false, error: "Failed to save image file" };
    }
  }

  try {
    await prisma.blog.create({
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image: imagePath,
        categories: {
          connect: categories.map((id) => ({ id: parseInt(id) })),
        },
      },
    });

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
  const imageFile = formData.get("image") as File | null;
  const categories = formData.getAll("categories") as string[];

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  let imagePath: string | null = null;

  if (imageFile) {
    // File type validation
    if (!imageFile.type.startsWith("image/")) {
      console.error("Invalid file type. Only images are allowed.");
      return { success: false, error: "Invalid file type. Only images are allowed." };
    }

    try {
      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(uploadsDir, fileName);

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    } catch (err) {
      console.error("Error saving the new image file:", err);
      return { success: false, error: "Failed to save new image file" };
    }
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
        image: imagePath || undefined,
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

    // Optional: Revalidate paths if needed
    revalidatePath("/dashboard/blog");

    return { success: true };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};
