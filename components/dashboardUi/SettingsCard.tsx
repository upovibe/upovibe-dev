import React from "react";
import { ContactIcon } from "lucide-react";
import MetricCard from "@/components/dashboardUi/MetricCard";


// Define the prop types for projects, blogs, and skills
interface Contact {
  id: string;
  name: string;
}

interface SettingsCardProps {
  contacts: Contact[];
}
const SettingsCard: React.FC<SettingsCardProps> = ({ contacts}) => {
  const contactCount = contacts.filter((ContactLink) => ContactLink.name).length;



  return (
    <div className="grid grid-cols-1 gap-6">
      <MetricCard
        title="Contacts"
        count={contactCount}
        icon={<ContactIcon className="w-12 h-12 text-teal-500 mb-2" />}
        description="" // No description for minimal display
        cardClassName="bg-gradient-to-r from-teal-100 to-teal-50"
        iconClassName="text-teal-500"
        titleColor="text-gray-800"
        countColor="text-teal-600"
        link="/dashboard/setting/contactlink"
      />
    </div>
  );
};

export default SettingsCard;
