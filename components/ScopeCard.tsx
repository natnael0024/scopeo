"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ScopeCardProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
}

export default function ScopeCard({ title, content, children }: ScopeCardProps) {
  return (
    <Card className="mb-4 relative overflow-hidden rounded-2xl border-gray-200 dark:border-gray-700">
      <div className="relative z-10">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent>
          {content && (
            <div className="prose prose-sm sm:prose lg:prose-lg">
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


