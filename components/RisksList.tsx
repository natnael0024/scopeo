// components/RiskList.tsx
import { FaExclamationTriangle, FaExclamationCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

type Risk = {
  description: string;
  severity: "low" | "medium" | "high";
};

export default function RiskList({ risks }: { risks: Risk[] }) {
  return (
    <ul className="space-y-3">
      {risks.map((risk, idx) => (
        <li key={idx} className="flex items-start gap-3">
          {risk.severity === "high" && (
            <MdErrorOutline className="text-red-600 mt-1" size={20} />
          )}
          {risk.severity === "medium" && (
            <FaExclamationTriangle className="text-yellow-500 mt-1" size={18} />
          )}
          {risk.severity === "low" && (
            <FaExclamationCircle className="text-green-600 mt-1" size={18} />
          )}

          <div>
            <p className="font-semibold capitalize">
              {risk.severity} risk
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {risk.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
