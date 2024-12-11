"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"

interface Project {
  id: string;
  slug: string;
  title: string;
  image: string;
}

interface ProjectArchiveProps {
  projects: Project[];
}

const ProjectArchive: React.FC<ProjectArchiveProps> = ({ projects }) => {
  return (
    <div className="h-auto flex flex-col items-center container mx-auto py-40 px-6 border-b">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-14 border-b-2 border-gray-800 pb-2 text-left">
        Projects
      </h3>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {projects.map((project) => (
          <Link
            href={`/project/${project.slug}`}
            key={project.id}
            className="group relative transition-all ease-linear duration-200 shadow-lg after:absolute after:bg-slate-400 hover:after:bg-slate-400/50 after:h-1/3 after:left-1/2 after:rounded-xl after:w-11/12 after:top-[-15px] after:z-[-1] after:-translate-x-1/2 rounded-b-xl"
          >
            <div className="overflow-hidden rounded-xl relative">
              {/* Image container with overlay */}
              <div className="relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={400}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-200"
                />
                {/* Background overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Title */}
              <h2 className="absolute -bottom-2 left-0 right-0 py-4 px-2 bg-black/20 group-hover:bg-transparent text-slate-200 group-hover:text-white transition-colors duration-200 text-xl font-bold mb-2 truncate capitalize">
                {project.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Corrected Link component for navigation */}
      <Button variant="ghost" className="ml-auto my-8 py-2"><Link href="/project">View more</Link></Button>
    </div>
  );
};

export default ProjectArchive;
