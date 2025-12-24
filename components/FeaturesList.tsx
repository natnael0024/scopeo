import { FaCheckCircle } from "react-icons/fa";

export default function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-2">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <FaCheckCircle
            className="text-green-600 mt-1 shrink-0"
            size={18}
          />
          <p className="text-sm text-gray-800 dark:text-gray-200">
            {feature}
          </p>
        </li>
      ))}
    </ul>
  );
}
