import React from 'react'
import Link from "next/link";

const projects = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
  ];

const page = () => {
    return (
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <Link href="/dashboard/project/new" className="text-blue-600 hover:underline">
            + New Project
          </Link>
          <ul className="mt-4">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default page