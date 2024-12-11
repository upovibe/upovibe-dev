import React from "react";
import Image from "next/image";

interface Skill {
  id: string;
  name: string;
  image: string;
  score: number;
}

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <div className="h-auto flex flex-col items-center justify-center container mx-auto py-40 px-6 gap-8 border-b">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-10 border-b-2 border-gray-800 pb-2 text-left">
        Skills
      </h3>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-10 justify gap-10 w-full ">
        {skills.map((skill) => {
          // Calculate the percentage based on the score
          const percentage = Math.min(skill.score, 100);

          // Determine the color based on the score
          let color = "bg-red-500";
          if (percentage >= 75) color = "bg-green-500"; // High skill level
          else if (percentage >= 50)
            color = "bg-yellow-500"; // Medium skill level
          else if (percentage >= 25) color = "bg-orange-500"; // Low skill level

          return (
            <div
              key={skill.id}
              className="flex flex-col items-center text-center space-y-4"
            >
              {/* Skill Icon */}
              <Image
                src={skill.image}
                alt={`${skill.name} Icon`}
                width={50}
                height={50}
                className="rounded-md"
              />
              {/* Skill Name */}
              <h3 className="text-xl font-semibold">{skill.name}</h3>
              {/* Progress Bar */}
              <div className="w-full bg-gray-300 shadow-inner border  rounded-full h-2 overflow-hidden">
                <div
                  className={`${color} h-full rounded-full transition-all duration-500 ease-in-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
