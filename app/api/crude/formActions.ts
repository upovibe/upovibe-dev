"use server";
import fs from "fs";
import path from "path";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

// ---------------- Project ----------------

// Create a new project
export const createProject = async (formData: FormData) => {
  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const imageFile = formData.get("image") as File | null;
  const tags = formData.get("tags") as string | null;
  const content = formData.get("content") as string | null;

  if (!title || !description || !content) {
    console.error("Missing required fields: title, description, or content");
    return {
      success: false,
      error: "Title, description, and content are required",
    };
  }

  let imagePath: string | null = null;

  if (imageFile) {
    if (!imageFile.type.startsWith("image/")) {
      console.error("Invalid file type. Only images are allowed.");
      return {
        success: false,
        error: "Invalid file type. Only images are allowed.",
      };
    }

    try {
      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });

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
    await prisma.project.create({
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image: imagePath,
        tags: tags || "", // Store as comma-separated string
        content,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const editProject = async (formData: FormData, id: string) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;
  const tags = formData.get("tags") as string | null;
  const content = formData.get("content") as string;

  if (!title || !description || !content) {
    throw new Error("Title, description, and content are required");
  }

  let imagePath: string | null = null;

  if (imageFile && imageFile.size > 0) {
    if (!imageFile.type.startsWith("image/")) {
      return {
        success: false,
        error: "Invalid file type. Only images are allowed.",
      };
    }

    try {
      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });

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
    if (isNaN(parsedId)) throw new Error("Invalid project ID");

    // Fetch the current project to get the existing image
    const existingProject = await prisma.project.findUnique({
      where: { id: parsedId },
    });
    if (!existingProject) {
      return { success: false, error: "Project not found" };
    }

    // If no new image is provided, keep the existing image
    const updatedProject = await prisma.project.update({
      where: { id: parsedId },
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image: imagePath || existingProject.image,
        tags: tags || "",
        content,
      },
    });

    return { success: true, project: updatedProject };
  } catch (error) {
    console.error("Error editing project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
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
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// ----------------Blog---------------------------

// Create a blog
export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const imageFile = formData.get("image") as File | null;
  const tags = formData.get("tags") as string | null;
  const content = formData.get("content") as string | null;

  if (!title || !description || !content) {
    console.error("Missing required fields: title, description, or content");
    return {
      success: false,
      error: "Title, description, and content are required",
    };
  }

  let imagePath: string | null = null;

  if (imageFile) {
    if (!imageFile.type.startsWith("image/")) {
      return {
        success: false,
        error: "Invalid file type. Only images are allowed.",
      };
    }

    try {
      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });

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
        tags: tags || "", // Store as comma-separated string
        content,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Edit a blog
export const editBlog = async (formData: FormData, id: string) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;
  const tags = formData.get("tags") as string | null;
  const content = formData.get("content") as string;

  if (!title || !description || !content) {
    throw new Error("Title, description, and content are required");
  }

  let imagePath: string | null = null;

  try {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) throw new Error("Invalid blog ID");

    // Fetch the current blog to get the existing image
    const existingBlog = await prisma.blog.findUnique({ where: { id: parsedId } });
    if (!existingBlog) {
      return { success: false, error: "Blog not found" };
    }

    // If a new image is uploaded, process and save it
    if (imageFile && imageFile.size > 0) {
      if (!imageFile.type.startsWith("image/")) {
        return {
          success: false,
          error: "Invalid file type. Only images are allowed.",
        };
      }

      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(uploadsDir, fileName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    } else {
      // Retain the existing image if no new image is uploaded
      imagePath = existingBlog.image;
    }

    // Update the blog
    const updatedBlog = await prisma.blog.update({
      where: { id: parsedId },
      data: {
        title,
        description,
        slug: title.replace(/\s+/g, "_").toLowerCase(),
        image: imagePath,
        tags: tags || existingBlog.tags || "",
        content,
      },
    });

    return { success: true, blog: updatedBlog };
  } catch (error) {
    console.error("Error editing blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
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
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// ------------------Skills ----------------

// Create a new skill
export const createSkill = async (formData: FormData) => {
  const name = formData.get("name") as string | null;
  const score = formData.get("score") as string | null;
  const imageFile = formData.get("image") as File | null;

  if (!name || !score) {
    console.error("Missing required fields: name or score");
    return { success: false, error: "Name and score are required" };
  }

  const parsedScore = parseInt(score);
  if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100) {
    console.error("Invalid score value");
    return {
      success: false,
      error: "Score must be a number between 0 and 100",
    };
  }

  let imagePath: string | null = null;

  if (imageFile) {
    if (!imageFile.type.startsWith("image/")) {
      console.error("Invalid file type. Only images are allowed.");
      return {
        success: false,
        error: "Invalid file type. Only images are allowed.",
      };
    }

    try {
      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });

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
    await prisma.skill.create({
      data: {
        name,
        score: parsedScore,
        image: imagePath,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating skill:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Edit an existing skill
export const editSkill = async (formData: FormData, id: string) => {
  const name = formData.get("name") as string | null;
  const score = formData.get("score") as string | null;
  const imageFile = formData.get("image") as File | null;

  if (!name || !score) {
    throw new Error("Name and score are required");
  }

  const parsedScore = parseInt(score);
  if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100) {
    throw new Error("Score must be a number between 0 and 100");
  }

  let imagePath: string | null = null;

  try {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) throw new Error("Invalid skill ID");

    // Fetch the current skill to get the existing image
    const existingSkill = await prisma.skill.findUnique({ where: { id: parsedId } });
    if (!existingSkill) {
      return { success: false, error: "Skill not found" };
    }

    // If a new image is uploaded, process and save it
    if (imageFile && imageFile.size > 0) {
      if (!imageFile.type.startsWith("image/")) {
        return {
          success: false,
          error: "Invalid file type. Only images are allowed.",
        };
      }

      const uploadsDir = path.resolve("./public/uploads");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(uploadsDir, fileName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    } else {
      // Retain the existing image if no new image is uploaded
      imagePath = existingSkill.image;
    }

    // Update the skill
    const updatedSkill = await prisma.skill.update({
      where: { id: parsedId },
      data: {
        name,
        score: parsedScore,
        image: imagePath, // Use the new image path or retain the old one
      },
    });

    return { success: true, skill: updatedSkill };
  } catch (error) {
    console.error("Error editing skill:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Delete a skill
export const deleteSkill = async (id: string) => {
  try {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) throw new Error("Invalid skill ID");

    await prisma.skill.delete({ where: { id: parsedId } });

    // Optional: Revalidate paths if needed
    revalidatePath("/dashboard/skills");

    return { success: true };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
