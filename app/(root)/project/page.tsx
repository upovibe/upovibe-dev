import React from "react";
import Link from "next/link";
import { prisma } from "@/prisma";
import Image from "next/image";

const Pages = async () => {
  const projects = await prisma.project.findMany();

  return (
    <div className="h-auto flex flex-col-reverse lg:flex-row items-center container mx-auto py-6 px-6">
      {projects.map((project) => (
        <div key={project.id} className="w-full lg:w-1/2 p-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <Link href={`/projects/${project.id}`} className="text-blue-500 hover:text-blue-700">
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pages;
