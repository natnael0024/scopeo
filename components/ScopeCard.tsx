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
    <Card className="mb-4 border-gray-200 dark:border-gray-700">
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
    </Card>
  );
}
