import React from "react";
import { ContactIcon, Lightbulb } from "lucide-react";
import MetricCard from "@/components/dashboardUi/MetricCard";

// Define the prop types for contacts and skills
interface Contact {
  id: number;
  name: string;
}

interface Skill {
  id: number;
  name: string;
}

interface SettingsCardProps {
  contacts: Contact[];
  skills: Skill[];
}

const SettingsCard: React.FC<SettingsCardProps> = ({ contacts, skills }) => {
  const contactCount = contacts.filter(
    (ContactLink) => ContactLink.name
  ).length;
  const skillCount = skills.filter((skill) => skill.name).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        title="Contacts"
        count={contactCount}
        icon={<ContactIcon className="w-12 h-12 text-teal-500 mb-2" />}
        description=""
        cardClassName="bg-gradient-to-r from-teal-100 to-teal-50"
        iconClassName="text-teal-500"
        titleColor="text-gray-800"
        countColor="text-teal-600"
        link="/dashboard/settings/contactlinks"
      />
      <MetricCard
        title="Skills"
        count={skillCount}
        icon={<Lightbulb className="w-12 h-12 text-blue-500 mb-2" />}
        description=""
        cardClassName="bg-gradient-to-r from-blue-100 to-blue-50"
        iconClassName="text-blue-500"
        titleColor="text-gray-800"
        countColor="text-blue-600"
        link="/dashboard/settings/skills"
      />
    </div>
  );
};

export default SettingsCard;
