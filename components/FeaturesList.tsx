import {
  FaCheckCircle,
  FaLightbulb,
  FaBan,
} from "react-icons/fa";
import { IconType } from "react-icons";

type ListType = "features" | "assumption" | "out-of-scope";

const TYPE_CONFIG: Record<
  ListType,
  { icon: IconType; color: string }
> = {
  features: {
    icon: FaCheckCircle,
    color: "text-green-600",
  },
  assumption: {
    icon: FaLightbulb,
    color: "text-yellow-500",
  },
  "out-of-scope": {
    icon: FaBan,
    color: "text-red-500",
  },
};

export default function FeatureList({
  items,
  type,
}: {
  items: string[];
  type: ListType;
}) {
  const { icon: Icon, color } = TYPE_CONFIG[type];

  return (
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-3">
          <Icon className={`${color} shrink-0`} size={18} />
          <p className="text-sm text-gray-800 dark:text-gray-200">
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
}
