import React from "react";
import { FolderGit2, FilePenLine, Lightbulb } from "lucide-react";
import MetricCard from "@/components/dashboardUi/MetricCard";

// Define the prop types for projects, blogs, and skills
interface Project {
  id: string;
  title: string;
}

interface Blog {
  id: string;
  title: string;
}

interface Skill {
  id: string;
  name: string;
}

interface DashboardCardProps {
  projects: Project[];
  blogs: Blog[];
  skills: Skill[];
}

const DashboardCard: React.FC<DashboardCardProps> = ({ projects, blogs, skills }) => {
  const projectCount = projects.filter((project) => project.title).length;
  const blogCount = blogs.filter((blog) => blog.title).length;
  const skillCount = skills.filter((skill) => skill.name).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Projects Card */}
      <MetricCard
        title="Projects"
        count={projectCount}
        icon={<FolderGit2 className="w-12 h-12 text-blue-500 mb-2" />}
        description="Number of existing projects so far"
        cardClassName="bg-gradient-to-r from-blue-100 to-blue-50"
        iconClassName="text-blue-500"
        titleColor="text-gray-800"
        countColor="text-blue-600"
        link="/dashboard/project"
      />

      {/* Blog Card */}
      <MetricCard
        title="Blogs"
        count={blogCount}
        icon={<FilePenLine className="w-12 h-12 text-green-500 mb-2" />}
        description="Number of blogs published so far"
        cardClassName="bg-gradient-to-r from-green-100 to-green-50"
        iconClassName="text-green-500"
        titleColor="text-gray-800"
        countColor="text-green-600"
        link="/dashboard/blog"
      />

      {/* Skills Card */}
      <MetricCard
        title="Skills"
        count={skillCount}
        icon={<Lightbulb className="w-12 h-12 text-purple-500 mb-2" />}
        description="Number of skills available"
        cardClassName="bg-gradient-to-r from-purple-100 to-purple-50"
        iconClassName="text-purple-500"
        titleColor="text-gray-800"
        countColor="text-purple-600"
        link="/dashboard/skill"
      />
    </div>
  );
};

export default DashboardCard;
