"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ScopeCardProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
  className?: string; // Add className prop
}

export default function ScopeCard({ title, content, children, className = "" }: ScopeCardProps) {
  return (
    <Card
      className={`mb-4 relative overflow-hidden rounded-2xl border-gray-200 dark:border-gray-700 shadow-lg transition-all hover:scale-[1.02] ${className}`}
    >
      <div className="relative z-10">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {content && (
            <div className="prose prose-sm sm:prose lg:prose-lg text-gray-700 dark:text-gray-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          )}
          {children}
        </CardContent>
      </div>
    </Card>
  );
}
