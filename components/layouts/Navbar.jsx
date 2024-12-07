import React from "react";
import Link from "next/link";

const Navbar = () => {
  const navItems = ["About", "Skills", "Projects", "Blog", "Contact"];

  return (
    <nav className="flex items-center justify-between w-full container">
      <Link href="/">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-200">
          Promise Uzor
        </h1>
      </Link>
      <ul className="flex space-x-8 text-lg font-medium">
        {navItems.map((item) => (
          <li key={item} className="group">
            <Link
              href={`#${item.toLowerCase()}`}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {item}
              <span className="block h-0.5 bg-gray-900 dark:bg-gray-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
