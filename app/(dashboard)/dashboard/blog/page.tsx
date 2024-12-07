import React from 'react'
import Link from "next/link";

const blog = [
    { id: 1, name: "blog 1" },
    { id: 2, name: "blog 2" },
  ];

const page = () => {
    return (
        <div>
          <h1 className="text-2xl font-bold">blog</h1>
          <Link href="/dashboard/blog/new" className="text-blue-600 hover:underline">
            + New Blog
          </Link>
          <ul className="mt-4">
            {blog.map((blog) => (
              <li key={blog.id}>
                <Link
                  href={`/dashboard/blog/${blog.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {blog.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default page