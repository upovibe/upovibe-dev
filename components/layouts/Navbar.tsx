"use client"; 

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls menu visibility
  const navItems = ["About", "Skills", "Projects", "Blog", "Contact"];

  return (
    <nav className="flex items-center justify-between w-full container p-6 relative">
      {/* Brand Logo */}
      <Link href="/">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-200">
          Promise Uzor
        </h1>
      </Link>

      {/* Hamburger Button for small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block md:hidden text-gray-600 dark:text-gray-400"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Items */}
      <ul
        className={`absolute md:static top-20 left-0 w-full md:w-auto bg-white dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent shadow-md md:shadow-none flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-lg font-medium z-50 transition-all duration-300 overflow-hidden ${
          isOpen ? "block" : "hidden md:flex"
        }`}
      >
        {navItems.map((item) => (
          <li key={item} className="group w-full md:w-auto">
            <Link
              href={`#${item.toLowerCase()}`}
              className="block w-full text-center md:w-auto md:text-left text-gray-600 dark:text-gray-400 py-2 transition-all duration-200 md:hover:text-gray-900 md:dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 md:hover:bg-transparent md:hover:scale-100"
              onClick={() => setIsOpen(false)} // Close menu on item click
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


// "use client"; 

// import React, { useState } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import { scroller } from "react-scroll";
// import Link from "next/link";
// import { scroll } from "next/navigation";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false); // Controls menu visibility
//   const navItems = ["About", "Skills", "Projects", "Blog", "Contact"];

//   const handleScroll = (section: string) => {
//     scroller.scrollTo(section.toLowerCase(), {
//       smooth: true,
//       offset: 0,
//       duration: 1000,
//     });
//   };

//   return (
//     <nav className="flex items-center justify-between w-full container p-6 relative">
//       {/* Brand Logo */}
//       <Link href="/">
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-200">
//           Promise Uzor
//         </h1>
//       </Link>

//       {/* Hamburger Button for small screens */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="block md:hidden text-gray-600 dark:text-gray-400"
//         aria-label="Toggle Menu"
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>

//       {/* Navigation Items */}
//       <ul
//         className={`absolute md:static top-20 left-0 w-full md:w-auto bg-white dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent shadow-md md:shadow-none flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-lg font-medium z-50 transition-all duration-300 overflow-hidden ${
//           isOpen ? "block" : "hidden md:flex"
//         }`}
//       >
//         {navItems.map((item) => (
//           <li key={item} className="group w-full md:w-auto">
//             <Link
//               href={`#${item.toLowerCase()}`}
//               className="block w-full text-center md:w-auto md:text-left text-gray-600 dark:text-gray-400 py-2 transition-all duration-200 md:hover:text-gray-900 md:dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 md:hover:bg-transparent md:hover:scale-100"
//               onClick={() => handleScroll(item)}>{item}
//               {item}
//               <span className="block h-0.5 bg-gray-900 dark:bg-gray-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
