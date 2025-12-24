import { FaTools, FaCheck, FaPlus } from "react-icons/fa";

interface SkillGroup {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}

export default function SkillsRequired({
  primary,
  supporting,
  optional,
}: {
  primary: string[];
  supporting?: string[];
  optional?: string[];
}) {
  const groups: SkillGroup[] = [
    {
      title: "Primary Skills",
      skills: primary,
      icon: <FaCheck className="text-green-600" />,
    },
    {
      title: "Supporting Skills",
      skills: supporting || [],
      icon: <FaTools className="text-blue-500" />,
    },
    {
      title: "Specialist / Optional",
      skills: optional || [],
      icon: <FaPlus className="text-orange-500" />,
    },
  ];

  return (
    <div className="space-y-4">
      {groups.map(
        (group) =>
          group.skills.length > 0 && (
            <div key={group.title}>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                {group.icon}
                {group.title}
              </h4>

              <ul className="space-y-1">
                {group.skills.map((skill, i) => (
                  <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
                    • {skill}
                  </li>
                ))}
              </ul>
            </div>
          )
      )}
    </div>
  );
}
