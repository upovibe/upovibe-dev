"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ContactLink {
  id: number;
  name: string;
  image: string;
  href: string;
}

interface ContactMeProps {
  contactlinks: ContactLink[];
}

const ContactMe: React.FC<ContactMeProps> = ({ contactlinks }) => {
  return (
    <div id="contact" className="h-auto flex flex-col items-center container mx-auto py-40 px-6 border-b">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-14 border-b-2 border-gray-800 pb-2 text-left">
        Contact Me
      </h3>
      <div className="w-full flex items-center justify-between gap-4">
        {contactlinks.map((ContactLink) => (
          <Link
            href={ContactLink.href}
            key={ContactLink.id}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-slate-300 p-1 px-2 h-12 pr-3 flex items-center justify-center rounded-full shadow-lg hover:shadow-none transition-all duration-200"
          >
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-transparent group-hover:animate-shine"></div>
            <div className="relative flex items-center gap-3">
              <Image
                src={ContactLink.image}
                alt={ContactLink.name}
                width={400}
                height={400}
                className="min-w-8 max-w-8 transition-all duration-300"
              />
              <h2 className="text-center text-lg font-bold capitalize">
                Contact me on {ContactLink.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContactMe;