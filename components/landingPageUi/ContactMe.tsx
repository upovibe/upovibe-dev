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
    <div className="h-auto flex flex-col items-center container mx-auto py-40 px-6 border-b">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-14 border-b-2 border-gray-800 pb-2 text-left">
        Contact Me
      </h3>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {contactlinks.map((ContactLink) => (
          <Link
            href={ContactLink.href}
            key={ContactLink.id}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative transition-all ease-linear duration-200 shadow-lg hover:shadow-xl rounded-xl overflow-hidden"
          >
            <div className="relative">
              <Image
                src={ContactLink.image}
                alt={ContactLink.name}
                width={400}
                height={400}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h2 className="absolute bottom-2 left-0 right-0 text-center text-white text-lg font-bold">
                {ContactLink.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContactMe;
