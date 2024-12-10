import React from "react";
import Image from "next/image";

const skillsData = [
  { name: "HTML", icon: "/icons/html-icon.png", level: 90, color: "bg-orange-500" },
  { name: "CSS", icon: "/icons/css-icon.png", level: 85, color: "bg-blue-500" },
  { name: "JavaScript", icon: "/icons/js-icon.png", level: 80, color: "bg-yellow-500" },
  { name: "React", icon: "/icons/react-icon.png", level: 75, color: "bg-teal-500" },
  { name: "Vue", icon: "/icons/vue-icon.png", level: 70, color: "bg-green-500" },
  { name: "Next.js", icon: "/icons/nextjs-icon.png", level: 65, color: "bg-gray-700" },
];

const Skills = () => {
  return (
    <div className="h-auto flex flex-col items-center justify-center container mx-auto py-60 px-6 gap-8 border-b">
      <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 justify gap-10 w-full ">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4"
          >
            {/* Skill Icon */}
            <Image
              src={skill.icon}
              alt={`${skill.name} Icon`}
              width={50}
              height={50}
              className="rounded-md"
            />
            {/* Skill Name */}
            <h3 className="text-xl font-semibold">{skill.name}</h3>
            {/* Progress Bar */}
            <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
              <div
                className={`${skill.color} h-full rounded-full transition-all duration-500 ease-in-out`}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
