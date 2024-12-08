import React from 'react'
import Link from "next/link";

const categorys = [
    { id: 1, name: "category 1" },
    { id: 2, name: "category 2" },
  ];

const page = () => {
    return (
      <div className="">
          <h1 className="text-2xl font-bold">categorys</h1>
          <Link href="/dashboard/category/new" className="text-blue-600 hover:underline">
            + New category
          </Link>
          <ul className="mt-4">
            {categorys.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/dashboard/category/${category.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default page