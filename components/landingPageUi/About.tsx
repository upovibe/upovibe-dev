"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  const icons = [
    { name: "email", href: "/", alt: "Email Icon" },
    { name: "github", href: "/", alt: "GitHub Icon" },
    { name: "linkedin", href: "/", alt: "LinkedIn Icon" },
  ];

  const images = ["/images/1730735150294.jpeg", "/images/hoMWoCop_400x400.jpg"];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="h-auto flex flex-col-reverse lg:flex-row items-center container mx-auto py-60 px-6 gap-8 border-b">
      {/* Left Side (Image & Links) */}
      <div className="w-full lg:w-4/12 flex flex-col items-center gap-6">
        {/* Image Transition Container */}
        <div className="relative size-[200px] flex items-center justify-center rounded-full border-8 border-gray-800 overflow-hidden shadow-xl">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Portrait ${index + 1}`}
              width={150} // Control image size explicitly
              height={150}
              className={`absolute size-[170px] rounded-full transition-all duration-500 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            />
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {icons.map((icon) => (
            <Link href={icon.href} key={icon.name}>
              <Image
                src={`/icons/${icon.name}.svg`}
                alt={icon.alt}
                width={24}
                height={24}
                className="hover:scale-125 transition-transform duration-200"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side (Text Content) */}
      <div className="w-full lg:w-6/12 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-gray-800 pb-2">
          About Me
        </h2>

        {/* First Paragraph */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          I’m a <strong>Fullstack Developer</strong> passionate about creating
          efficient, scalable, and user-friendly web solutions. With experience
          in both <strong>frontend</strong> and <strong>backend</strong>{" "}
          development, I build seamless applications that deliver real value.
        </p>

        {/* Second Paragraph */}
        <p className="text-lg text-gray-600 dark:text-gray-400">
          I’m open to collaboration and always ready to contribute to innovative
          projects. Currently seeking opportunities to join a dynamic team or
          work on exciting freelance ventures.
        </p>
      </div>
    </div>
  );
};

export default About;
