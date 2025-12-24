import { FaClipboardQuestion } from "react-icons/fa6";

export default function ClarifyingQuestionsList({ clarifyingQuestions }: { clarifyingQuestions: string[] }) {
  return (
    <ul className="space-y-2">
      {clarifyingQuestions.map((q, idx) => (
        <li key={idx} className="flex items-center gap-3">
          <FaClipboardQuestion
            className="text-sky-600  shrink-0"
            size={18}
          />
          <p className="text- text-gray-800 dark:text-gray-200">
            {q}
          </p>
        </li>
      ))}
    </ul>
  );
}
